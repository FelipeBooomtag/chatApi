<?php namespace Felep\Chat\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateFelepChatBrands2 extends Migration
{
    public function up()
    {
        Schema::table('felep_chat_brands', function($table)
        {
            $table->increments('brand_id')->unsigned()->change();
        });
    }
    
    public function down()
    {
        Schema::table('felep_chat_brands', function($table)
        {
            $table->increments('brand_id')->unsigned(false)->change();
        });
    }
}
