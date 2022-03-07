<?php namespace Felep\Chat\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateFelepChatProducts extends Migration
{
    public function up()
    {
        Schema::rename('felep_chat_product', 'felep_chat_products');
    }
    
    public function down()
    {
        Schema::rename('felep_chat_products', 'felep_chat_product');
    }
}
