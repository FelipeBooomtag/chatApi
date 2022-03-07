<?php namespace Felep\Chat\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateFelepChatClient extends Migration
{
    public function up()
    {
        Schema::create('felep_chat_client', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('client_id');
            $table->string('first_name');
            $table->string('last_name');
            $table->integer('phone_number');
            $table->string('email');
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('felep_chat_client');
    }
}
