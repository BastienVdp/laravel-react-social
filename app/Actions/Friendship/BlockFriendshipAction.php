<?php

namespace App\Actions\Friendship;

use App\Models\User;
use App\Models\Conversation;
use App\Actions\Conversation\DeleteConversationAction;

final class BlockFriendshipAction
{
    public function execute(
        int $senderId,
        int $recipientId,
    ): void {
        User::find($senderId)
            ->blockFriend(User::find($recipientId));
        
        (new DeleteConversationAction)->execute(
            Conversation::with('participants')->hasParticipants([$senderId, $recipientId])->value('id')
        );
    }
}
