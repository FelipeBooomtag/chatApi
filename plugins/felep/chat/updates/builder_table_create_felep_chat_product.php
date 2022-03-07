<?php namespace Felep\Chat\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateFelepChatProduct extends Migration
{
    public function up()
    {
        Schema::create('felep_chat_product', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('product_id');
            $table->string('product_name');
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('felep_chat_product');
    }
}
