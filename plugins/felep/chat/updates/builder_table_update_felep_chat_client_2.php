<?php namespace Felep\Chat\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateFelepChatClient2 extends Migration
{
    public function up()
    {
        Schema::table('felep_chat_client', function($table)
        {
            $table->increments('client_id')->unsigned(false)->change();
        });
    }
    
    public function down()
    {
        Schema::table('felep_chat_client', function($table)
        {
            $table->increments('client_id')->unsigned()->change();
        });
    }
}
