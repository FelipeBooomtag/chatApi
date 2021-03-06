/*
 * Field Repeater plugin
 *
 * Data attributes:
 * - data-control="fieldrepeater" - enables the plugin on an element
 * - data-option="value" - an option with a value
 *
 * JavaScript API:
 * $('a#someElement').fieldRepeater({...})
 */

+function ($) { "use strict";

    var Base = $.oc.foundation.base,
        BaseProto = Base.prototype;

    // FIELD REPEATER NAMESPACES
    // ============================

    if ($.oc === undefined) {
        $.oc = {};
    }

    if ($.oc.fieldRepeater === undefined) {
        $.oc.fieldRepeater = {};
    }

    // FIELD REPEATER CLASS DEFINITION
    // ============================

    var Repeater = function(element, options) {
        this.options = options;
        this.$el = $(element);
        this.itemCount = 0;
        this.canRemove = true;

        $.oc.foundation.controlUtils.markDisposable(element);
        Base.call(this);
        this.init();
    }

    Repeater.prototype = Object.create(BaseProto);
    Object.assign(Repeater.prototype, $.oc.fieldRepeater.standardMode.prototype);
    Object.assign(Repeater.prototype, $.oc.fieldRepeater.builderMode.prototype);
    Repeater.prototype.constructor = Repeater;

    Repeater.DEFAULTS = {
        useReorder: true,
        sortableHandle: '.repeater-item-handle',
        removeHandler: 'onRemoveItem',
        useDuplicate: true,
        duplicateHandler: 'onDuplicateItem',
        removeConfirm: 'Are you sure?',
        displayMode: 'simple',
        titleFrom: null,
        minItems: null,
        maxItems: null
    }

    Repeater.prototype.init = function() {
        this.$itemContainer = $('> .field-repeater-items', this.$el);

        if (this.options.displayMode === 'builder') {
            this.initBuilderMode();
        }
        else {
            this.initStandardMode();
        }

        if (this.options.useReorder) {
            this.bindSorting();
        }

        // Items
        var headSelect = this.selectorHeader;
        this.$el.on('click', headSelect, this.proxy(this.clickItemHeader));
        this.$el.on('change', headSelect + ' input[type=checkbox]', this.proxy(this.clickItemCheckbox));
        this.$el.on('click', headSelect + ' .repeater-item-menu', this.proxy(this.clickItemMenu));
        this.$el.on('click', headSelect + ' [data-repeater-move-up]', this.proxy(this.clickMoveItemUp));
        this.$el.on('click', headSelect + ' [data-repeater-move-down]', this.proxy(this.clickMoveItemDown));
        this.$el.on('click', headSelect + ' [data-repeater-remove]', this.proxy(this.clickRemoveItem));
        this.$el.on('click', headSelect + ' [data-repeater-duplicate]', this.proxy(this.clickDuplicateItem));

        // Toolbar
        this.$toolbar = $(this.selectorToolbar, this.$el);
        this.$toolbar.on('click', '> [data-repeater-add-group]', this.proxy(this.clickAddGroupButton));
        this.$toolbar.on('ajaxDone', '> [data-repeater-add]', this.proxy(this.onAddItemSuccess));

        this.$el.one('dispose-control', this.proxy(this.dispose));

        this.countItems();
        this.togglePrompt();

        // @deprecated
        this.applyStyle();
    }

    Repeater.prototype.dispose = function() {
        this.sortable.destroy();

        if (this.options.displayMode === 'builder') {
            this.disposeBuilderMode();
        }
        else {
            this.disposeStandardMode();
        }

        // Items
        var headSelect = this.selectorHeader;
        this.$el.off('click', headSelect, this.proxy(this.clickItemHeader));
        this.$el.off('change', headSelect + ' input[type=checkbox]', this.proxy(this.clickItemCheckbox));
        this.$el.off('click', headSelect + ' .repeater-item-menu', this.proxy(this.clickItemMenu));
        this.$el.off('click', headSelect + ' [data-repeater-move-up]', this.proxy(this.clickMoveItemUp));
        this.$el.off('click', headSelect + ' [data-repeater-move-down]', this.proxy(this.clickMoveItemDown));
        this.$el.off('click', headSelect + ' [data-repeater-remove]', this.proxy(this.clickRemoveItem));
        this.$el.off('click', headSelect + ' [data-repeater-duplicate]', this.proxy(this.clickDuplicateItem));

        // Toolbar
        this.$toolbar.off('click', '> [data-repeater-add-group]', this.proxy(this.clickAddGroupButton));
        this.$toolbar.off('ajaxDone', '> [data-repeater-add]', this.proxy(this.onAddItemSuccess));

        this.$el.off('dispose-control', this.proxy(this.dispose));
        this.$el.removeData('oc.repeater');

        this.$el = null;
        this.$toolbar = null;
        this.$sortableBody = null;
        this.options = null;

        BaseProto.dispose.call(this);
    }

    // @deprecated
    Repeater.prototype.unbind = function() {
        this.dispose();
    }

    Repeater.prototype.bindSorting = function() {
        this.$sortableBody = $(this.selectorSortable, this.$el);

        this.sortable = Sortable.create(this.$sortableBody.get(0), {
            // forceFallback: true,
            animation: 150,
            multiDrag: true,
            avoidImplicitDeselect: true,
            handle: this.options.sortableHandle,
            onEnd: this.proxy(this.onSortableEnd)
        });
    }

    Repeater.prototype.onSortableEnd = function(ev) {
        this.eventSortableOnEnd && this.eventSortableOnEnd();
    }

    Repeater.prototype.clickItemHeader = function(ev) {
        var $target = $(ev.target);
        if (
            !$target.hasClass('repeater-header') &&
            !$target.hasClass('repeater-item-title') &&
            !$target.hasClass('repeater-item-checkbox')
        ) {
            return;
        }

        var $item = $target.closest('.repeater-header'),
            $checkbox = $('input[type=checkbox]:first', $item),
            checked = $checkbox.is(':checked');

        $checkbox.prop('checked', !checked);
        this.clickItemCheckbox({ target: $checkbox.get(0) });
    }

    Repeater.prototype.clickItemCheckbox = function(ev) {
        var $target = $(ev.target),
            $item = $target.closest('li'),
            checked = $target.is(':checked');

        $item.toggleClass('is-checked', checked);

        if (checked) {
            Sortable.utils.select($item.get(0));
        }
        else {
            Sortable.utils.deselect($item.get(0));
        }
    }

    Repeater.prototype.clickItemMenu = function(ev) {
        var templateHtml = $('> [data-item-menu-template]', this.$el).html(),
            $target = $(ev.target),
            $item = $target.closest('li'),
            $dropdownList = $('.dropdown-menu:first', $target.closest('.dropdown'));

        $dropdownList.html(templateHtml);

        this.eventMenuFilter($item, $dropdownList);
    }

    Repeater.prototype.clickRemoveItem = function(ev) {
        // Button is disabled
        if ($(ev.target).closest('li').hasClass('disabled')) {
            return;
        }

        this.onRemoveItem(this.findItemFromTarget(ev.target));
    }

    Repeater.prototype.onRemoveItem = function($item) {
        var self = this,
            $items = this.getCheckedItemsOrItem($item);

        var itemData = [];
        $.each($items, function(k, item) {
            itemData.push({
                repeater_index: $(item).data('repeater-index'),
                repeater_group: $(item).data('repeater-group')
            })
        });

        $item.request(this.options.removeHandler, {
            data: {
                _repeater_items: itemData
            },
            confirm: this.options.removeConfirm,
            afterUpdate: function() {
                self.onRemoveItemSuccess($items);
            }
        });
    }

    Repeater.prototype.onRemoveItemSuccess = function($items) {
        var self = this;

        $.each($items, function(k, item) {
            var $item = $(item);
            self.diposeItem($item);
            $item.remove();

            self.eventOnRemoveItem && self.eventOnRemoveItem($item);

            self.countItems();
            self.triggerChange();
        });
    }

    Repeater.prototype.clickDuplicateItem = function(ev) {
        this.onDuplicateItem(this.findItemFromTarget(ev.target));
    }

    Repeater.prototype.onDuplicateItem = function($item) {
        var self = this;

        var itemData = {
            _repeater_index: $item.data('repeater-index'),
            _repeater_group: $item.data('repeater-group')
        };

        $item.request(this.options.duplicateHandler, {
            data: itemData,
            afterUpdate: function(data) {
                self.onDuplicateItemSuccess($item, data.result.duplicateIndex);
            }
        });
    }

    Repeater.prototype.onDuplicateItemSuccess = function($item, duplicateIndex) {
        var itemIndex = $item.data('repeater-index'),
            $duplicateItem = $('> li[data-repeater-index='+duplicateIndex+']', this.$itemContainer);

        this.findItemFromIndex(itemIndex).after($duplicateItem);

        this.countItems();
        this.triggerChange();
    }

    Repeater.prototype.clickMoveItemUp = function(ev) {
        var $item = this.findItemFromTarget(ev.target),
            $prevItem = $item.prev();

        $prevItem.before($item);

        this.onSortableEnd();
    }

    Repeater.prototype.clickMoveItemDown = function(ev) {
        var $item = this.findItemFromTarget(ev.target),
            $nextItem = $item.next();

        $nextItem.after($item);

        this.onSortableEnd();
    }

    Repeater.prototype.clickAddGroupButton = function(ev) {
        var self = this,
            templateHtml = $('> [data-group-palette-template]', this.$el).html(),
            $target = $(ev.target),
            $form = this.$el.closest('form');

        $target.ocPopover({
            content: templateHtml
        });

        var $container = $target.data('oc.popover').$container;

        // Initialize the scrollpad control in the popup
        $container.trigger('render');

        $container
            .on('click', 'a', function (ev) {
                setTimeout(function() { $(ev.target).trigger('close.oc.popover') }, 1)
            })
            .on('ajaxPromise', '[data-repeater-add]', function(ev, context) {
                $target.addClass('oc-loading');

                $form.one('ajaxComplete', function() {
                    $target.removeClass('oc-loading');
                    self.itemCount++;
                    self.triggerChange();
                });

                // Event
                self.eventOnAddItem && self.eventOnAddItem();
            });

        $('[data-repeater-add]', $container).data('request-form', $form);
    }

    Repeater.prototype.onAddItemSuccess = function(ev) {
        this.itemCount++;
        this.triggerChange();
    }

    Repeater.prototype.triggerChange = function() {
        this.togglePrompt();

        // Trigger change event for compatibility with october.form.js
        this.$el.closest('[data-field-name]').trigger('change.oc.formwidget');

        // Event
        this.eventOnChange && this.eventOnChange();
    }

    Repeater.prototype.togglePrompt = function () {
        if (this.options.minItems && this.options.minItems > 0) {
            this.canRemove = this.itemCount > this.options.minItems;
        }

        if (this.options.maxItems && this.options.maxItems > 0) {
            this.$toolbar.toggle(this.itemCount < this.options.maxItems);
        }

        $('> [data-repeater-pointer-input]:first', this.$el).attr('disabled', !!this.itemCount);
    }

    Repeater.prototype.getCollapseTitle = function($item) {
        var $target,
            defaultText = '',
            explicitText = $item.data('item-title');

        if (explicitText) {
            return explicitText;
        }

        if (this.options.titleFrom) {
            $target = $('[data-field-name="'+this.options.titleFrom+'"]', $item);
            if (!$target.length) {
                $target = $item;
            }
        }
        else {
            $target = $item;
        }

        var $textInput = $('input[type=text]:first, select:first', $target).first();
        if ($textInput.length) {
            switch($textInput.prop("tagName")) {
                case 'SELECT':
                    return $textInput.find('option:selected').text();
                default:
                    return $textInput.val();
            }
        }
        else {
            var $disabledTextInput = $('.text-field:first > .form-control', $target);
            if ($disabledTextInput.length) {
                return $disabledTextInput.text();
            }
        }

        return defaultText;
    }

    // @deprecated
    Repeater.prototype.getStyle = function() {
        var style = 'default';

        // Validate style
        if (this.options.style && ['collapsed', 'accordion'].indexOf(this.options.style) !== -1) {
            style = this.options.style;
        }

        return style;
    }

    // @deprecated
    Repeater.prototype.applyStyle = function() {
        var style = this.getStyle(),
            items = $(this.$el).children('.field-repeater-items').children('.field-repeater-item'),
            self = this;

        $.each(items, function(key, item) {
            switch (style) {
                case 'collapsed':
                    self.collapse($(item));
                    break;
                case 'accordion':
                    if (key !== 0) {
                        self.collapse($(item));
                    }
                    break;
            }
        });
    }

    Repeater.prototype.findItemFromIndex = function(itemIndex) {
        return $('> li[data-repeater-index='+itemIndex+']:first', this.$itemContainer);
    }

    Repeater.prototype.findItemFromTarget = function(target) {
        return $(target).closest('.repeater-header').closest('li');
    }

    Repeater.prototype.diposeItem = function($item) {
        $('[data-disposable]', $item).each(function () {
            var $el = $(this),
                control = $el.data('control'),
                widget = $el.data('oc.' + control);

            if (widget && typeof widget['dispose'] === 'function') {
                widget.dispose();
            }
        });
    }

    Repeater.prototype.getCheckedItemsOrItem = function($item) {
        var $items = this.getCheckedItems();

        if (!$items.length) {
            $items = [$item];
        }

        return $items;
    }

    Repeater.prototype.getCheckedItems = function() {
        var $checkboxes = $(this.selectorChecked, this.$el),
            result = [];

        $.each($checkboxes, function(k, $checkbox) {
            result.push($checkbox.closest('li'));
        });

        return result;
    }

    Repeater.prototype.countItems = function() {
        this.itemCount = $('> .field-repeater-item', this.$itemContainer).length;
    }

    // FIELD REPEATER PLUGIN DEFINITION
    // ============================

    var old = $.fn.fieldRepeater;

    $.fn.fieldRepeater = function (option) {
        var args = Array.prototype.slice.call(arguments, 1), result
        this.each(function () {
            var $this   = $(this)
            var data    = $this.data('oc.repeater')
            var options = $.extend({}, Repeater.DEFAULTS, $this.data(), typeof option == 'object' && option)
            if (!data) $this.data('oc.repeater', (data = new Repeater(this, options)))
            if (typeof option == 'string') result = data[option].apply(data, args)
            if (typeof result != 'undefined') return false
        });

        return result ? result : this;
    }

    $.fn.fieldRepeater.Constructor = Repeater;

    // FIELD REPEATER NO CONFLICT
    // =================

    $.fn.fieldRepeater.noConflict = function () {
        $.fn.fieldRepeater = old;
        return this;
    }

    // FIELD REPEATER DATA-API
    // ===============

    $(document).render(function() {
        $('[data-control="fieldrepeater"]').fieldRepeater();
    });

}(window.jQuery);
