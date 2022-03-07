<?php namespace Felep\Chat\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateFelepChatClients extends Migration
{
    public function up()
    {
        Schema::rename('felep_chat_client', 'felep_chat_clients');
    }
    
    public function down()
    {
        Schema::rename('felep_chat_clients', 'felep_chat_client');
    }
}
