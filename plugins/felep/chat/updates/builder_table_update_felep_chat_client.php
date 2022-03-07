<?php namespace Felep\Chat\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateFelepChatClient extends Migration
{
    public function up()
    {
        Schema::table('felep_chat_client', function($table)
        {
            $table->string('owned_product');
            $table->string('owned_brand');
        });
    }
    
    public function down()
    {
        Schema::table('felep_chat_client', function($table)
        {
            $table->dropColumn('owned_product');
            $table->dropColumn('owned_brand');
        });
    }
}
