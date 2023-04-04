<?php

namespace App\Actions\Conversation;

use App\Models\Conversation;

final class StoreConversationAction
{
    public function execute(
        int $senderId,
        int $recipientId,
    ): void {
        Conversation::create()->participants()->attach([
            $senderId,
            $recipientId,
        ]);

    }
}
