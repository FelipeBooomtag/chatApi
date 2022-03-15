<?php namespace Felep\Chat\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateFelepChatMessages2 extends Migration
{
    public function up()
    {
        Schema::table('felep_chat_messages', function($table)
        {
            $table->renameColumn('message', 'message_text');
        });
    }
    
    public function down()
    {
        Schema::table('felep_chat_messages', function($table)
        {
            $table->renameColumn('message_text', 'message');
        });
    }
}
