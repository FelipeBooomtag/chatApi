<?php

use Backend\Classes\Controller;
use components\Pusher;
use Felep\Chat\api\UserController;
use Felep\Chat\api\MessageController;

Route::post('/sender', function(){
    return redirect()->back();
});

Route::get('api/account', [UserController::class, 'index']);

Route::get('api/message', [MessageController::class, 'show']);
Route::post('api/postmessage', [MessageController::class, 'store']);