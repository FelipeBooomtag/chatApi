<?php namespace Felep\Chat\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateFelepChatBrands extends Migration
{
    public function up()
    {
        Schema::rename('felep_chat_brand', 'felep_chat_brands');
    }
    
    public function down()
    {
        Schema::rename('felep_chat_brands', 'felep_chat_brand');
    }
}
