<?php namespace Felep\Chat\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateFelepChatBrand2 extends Migration
{
    public function up()
    {
        Schema::table('felep_chat_brand', function($table)
        {
            $table->increments('brand_id')->unsigned(false)->change();
            $table->dropColumn('brand_address');
        });
    }
    
    public function down()
    {
        Schema::table('felep_chat_brand', function($table)
        {
            $table->increments('brand_id')->unsigned()->change();
            $table->text('brand_address')->nullable();
        });
    }
}
