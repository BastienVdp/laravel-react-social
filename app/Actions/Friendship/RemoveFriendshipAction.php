<?php

namespace App\Actions\Friendship;

use App\Models\User;

final class RemoveFriendshipAction
{
    public function execute(
        int $senderId,
        int $recipientId,
    ): void {
        User::find($senderId)
            ->unfriend(User::find($recipientId));
    }
}
