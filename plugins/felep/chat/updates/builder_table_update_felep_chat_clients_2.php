<?php namespace Felep\Chat\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateFelepChatClients2 extends Migration
{
    public function up()
    {
        Schema::table('felep_chat_clients', function($table)
        {
            $table->string('owned_product', 255)->nullable()->change();
            $table->string('owned_brand', 255)->nullable()->change();
        });
    }
    
    public function down()
    {
        Schema::table('felep_chat_clients', function($table)
        {
            $table->string('owned_product', 255)->nullable(false)->change();
            $table->string('owned_brand', 255)->nullable(false)->change();
        });
    }
}
