<?php namespace Felep\Chat\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateFelepChatMessages extends Migration
{
    public function up()
    {
        Schema::rename('felep_chat_message', 'felep_chat_messages');
    }
    
    public function down()
    {
        Schema::rename('felep_chat_messages', 'felep_chat_message');
    }
}
