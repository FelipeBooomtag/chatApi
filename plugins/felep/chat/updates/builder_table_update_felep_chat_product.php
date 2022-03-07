<?php namespace Felep\Chat\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateFelepChatProduct extends Migration
{
    public function up()
    {
        Schema::table('felep_chat_product', function($table)
        {
            $table->increments('product_id')->unsigned(false)->change();
        });
    }
    
    public function down()
    {
        Schema::table('felep_chat_product', function($table)
        {
            $table->increments('product_id')->unsigned()->change();
        });
    }
}
