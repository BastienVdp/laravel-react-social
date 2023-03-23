<?php

namespace App\Actions\Friendship;

use App\Models\User;

final class BlockFriendshipAction
{
    public function execute(
        int $senderId,
        int $recipientId,
    ): void {
        User::find($senderId)
            ->blockFriend(User::find($recipientId));
    }
}
