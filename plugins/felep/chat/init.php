<?php

Event::listen('felep.chat.message-sent', function(){
    $data = 'hello world!';
});