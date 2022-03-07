<?php namespace Felep\Chat\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateFelepChatProducts3 extends Migration
{
    public function up()
    {
        Schema::table('felep_chat_products', function($table)
        {
            $table->increments('product_id')->unsigned()->change();
        });
    }
    
    public function down()
    {
        Schema::table('felep_chat_products', function($table)
        {
            $table->increments('product_id')->unsigned(false)->change();
        });
    }
}
