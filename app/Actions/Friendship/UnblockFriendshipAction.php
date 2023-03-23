<?php

namespace App\Actions\Friendship;

use App\Models\User;

final class UnblockFriendshipAction
{
    public function execute(
        int $senderId,
        int $recipientId,
    ): void {
        User::find($senderId)
            ->unblockFriend(User::find($recipientId));
    }
}
