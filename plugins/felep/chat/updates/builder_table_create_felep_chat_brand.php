<?php namespace Felep\Chat\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateFelepChatBrand extends Migration
{
    public function up()
    {
        Schema::create('felep_chat_brand', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->string('brand_name');
            $table->text('brand_address')->nullable();
            $table->integer('phone_number');
            $table->string('brand_email');
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('felep_chat_brand');
    }
}
