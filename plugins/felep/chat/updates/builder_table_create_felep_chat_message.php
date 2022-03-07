<?php namespace Felep\Chat\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateFelepChatMessage extends Migration
{
    public function up()
    {
        Schema::create('felep_chat_message', function($table)
        {
            $table->engine = 'InnoDB';
            $table->text('message');
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('felep_chat_message');
    }
}
