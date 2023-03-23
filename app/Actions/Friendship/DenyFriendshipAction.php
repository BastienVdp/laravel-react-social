<?php

namespace App\Actions\Friendship;

use App\Models\User;

final class DenyFriendshipAction
{
    public function execute(
        int $senderId,
        int $recipientId,
    ): void {
        User::find($recipientId)
            ->denyFriendRequest(User::find($senderId));
    }
}
