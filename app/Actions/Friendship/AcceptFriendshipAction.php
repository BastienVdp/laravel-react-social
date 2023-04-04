<?php

namespace App\Actions\Friendship;

use App\Models\User;
use App\Actions\Conversation\StoreConversationAction;

final class AcceptFriendshipAction
{
    public function execute(
        int $senderId,
        int $recipientId,
    ): void {
        User::find($recipientId)
            ->acceptFriendRequest(User::find($senderId));

        (new StoreConversationAction)->execute($senderId, $recipientId);
    }
}
