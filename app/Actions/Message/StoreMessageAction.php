<?php

namespace App\Actions\Message;

use App\Enums\MessageStatus;
use App\Models\Message;
use Illuminate\Http\Request;

final class StoreMessageAction
{
    public function execute(
       Request $request
    )
    {
        $message = Message::create([
            'content' => $request->content,
            'conversation_id' => $request->conversation_id,
            'read' => MessageStatus::UNREAD,
            'user_id' => $request->user()->id
        ]);

        return $message;
    }
}
