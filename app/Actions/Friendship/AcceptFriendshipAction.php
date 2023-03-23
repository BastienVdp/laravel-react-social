<?php

namespace App\Actions\Friendship;

use App\Models\User;

final class AcceptFriendshipAction
{
    public function execute(
        int $senderId,
        int $recipientId,
    ): void {
        User::find($recipientId)
            ->acceptFriendRequest(User::find($senderId));
    }
}
