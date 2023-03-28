<?php

namespace App\Actions\Friendship;

use App\Models\Post;
use App\Models\User;

final class SendFriendshipAction
{
    public function execute(
        int $senderId,
        int $recipientId,
    ): bool {
        $user = User::find($senderId);
        if($user->canBeFriend(User::find($recipientId))) {
            $user->befriend(User::find($recipientId));
            return true;
        } else {
            // throw exception
            return false;
        }
    }
}
