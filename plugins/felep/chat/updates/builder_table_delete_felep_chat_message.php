<?php namespace Felep\Chat\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableDeleteFelepChatMessage extends Migration
{
    public function up()
    {
        Schema::dropIfExists('felep_chat_message');
    }
    
    public function down()
    {
        Schema::create('felep_chat_message', function($table)
        {
            $table->engine = 'InnoDB';
            $table->text('message');
        });
    }
}
