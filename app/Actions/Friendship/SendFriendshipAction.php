<?php

namespace App\Actions\Friendship;

use App\Models\Post;
use App\Models\User;

final class SendFriendshipAction
{
    public function execute(
        int $senderId,
        int $recipientId,
    ): void {
        User::find($senderId)
            ->befriend(User::find($recipientId));
    }
}
