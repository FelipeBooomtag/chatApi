<?php namespace Felep\Chat\Components;

use Cms\Classes\ComponentBase;

/**
 * Message Component
 */
class Message extends ComponentBase
{
    public function componentDetails()
    {
        return [
            'name' => 'message Component',
            'description' => 'This will create a message to send to users'
        ];
    }

    public function defineProperties()
    {
        return [];
    }

    public function onMessage()
    {
        $data = post('description');
    }
}
