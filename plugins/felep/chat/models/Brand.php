<?php namespace Felep\Chat\Models;

use Model;

/**
 * Model
 */
class Brand extends Model
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
    public $table = 'felep_chat_brands';

    public $belongsToMany= [
        'products' => [
            'Felep/Test/Models/Product',
            'table' => 'felep_chat_products',
            'order' => 'product_name',
        ]
        ];

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];


}
