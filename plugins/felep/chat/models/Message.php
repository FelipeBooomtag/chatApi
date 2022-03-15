<?php namespace Felep\Chat\Models;

use Model;

/**
 * Model
 */
class Message extends Model
{
    use \October\Rain\Database\Traits\Validation;
    
    /*
     * Disable timestamps by default.
     * Remove this line if timestamps are defined in the database table.
     */
    public $timestamps = false;

    public $fillable = [
        'description',
    ];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'felep_chat_messages';

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];
}
