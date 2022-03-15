<?php namespace Felep\Chat;

use System\Classes\PluginBase;
use Pusher;



class Plugin extends PluginBase
{
    public function registerComponents()
    {
           return [
                \Felep\Chat\Components\Message::class => "postmessage"
            ];
        
    }

    public function registerSettings()
    {

    }



    public function boot()
    {
        $app_id = "1352103";
        $key = "f677c3aee981700636b2";
        $secret = "caf036d5732ff74057e0";
        $cluster = "eu";
       
        $data = request()->data;
        $pusher = new Pusher\Pusher($key, $secret, $app_id, ['cluster' => $cluster]);
        $pusher->trigger('my-channel', 'my-event', $data);
        
    }
}
