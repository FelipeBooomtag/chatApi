<?php namespace Felep\Chat\Models;

use Model;

/**
 * Model
 */
class ChatMessage extends Model
{
    use \October\Rain\Database\Traits\Validation;
    
    /*
     * Disable timestamps by default.
     * Remove this line if timestamps are defined in the database table.
     */
    public $timestamps = false;


    /**
     * @var string The database table used by the model.
     */
    public $table = 'felep_chat_message';

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];
}
