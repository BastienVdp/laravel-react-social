<?php

namespace App\Actions\Message;

use App\Models\Message;

final class StoreMessageAction 
{

    public function execute(
       $request
    )
    {
        $message = Message::create([
            'content' => $request->content,
            'conversation_id' => $request->conversation_id,
            'user_id' => $request->user()->id
        ]);

        return $message;
    }
}