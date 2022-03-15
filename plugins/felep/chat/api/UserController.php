<?php namespace Felep\Chat\api;

use Illuminate\Routing\Controller;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller {
    
    public function index()
    {
        $user = JWTAuth::parseToken()->authenticate();
        

        return $user;
    } 
}