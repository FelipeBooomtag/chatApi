<?php namespace Felep\Chat\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateFelepChatBrand extends Migration
{
    public function up()
    {
        Schema::table('felep_chat_brand', function($table)
        {
            $table->renameColumn('id', 'brand_id');
        });
    }
    
    public function down()
    {
        Schema::table('felep_chat_brand', function($table)
        {
            $table->renameColumn('brand_id', 'id');
        });
    }
}
