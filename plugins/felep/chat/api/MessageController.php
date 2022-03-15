<?php namespace Felep\Chat\api;

use Felep\Chat\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class MessageController extends Controller
{
    public function show()
    {
        $message = Message::select('message_text')->get();
        return $message;
    }

    public function store(Request $request)
    {
        $message = $request->input('message_text');
        return $message;
    }
}