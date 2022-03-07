<?php namespace Felep\Chat\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateFelepChatProducts2 extends Migration
{
    public function up()
    {
        Schema::table('felep_chat_products', function($table)
        {
            $table->string('brand_name');
        });
    }
    
    public function down()
    {
        Schema::table('felep_chat_products', function($table)
        {
            $table->dropColumn('brand_name');
        });
    }
}
