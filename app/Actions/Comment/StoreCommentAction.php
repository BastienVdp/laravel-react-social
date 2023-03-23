<?php

namespace App\Actions\Comment;

use App\Models\Comment;

final class StoreCommentAction
{
    public function execute(
        string $body,
        int $postId,
        int $userId,
    ): void {
        Comment::create([
            'body' => $body,
            'post_id' => $postId,
            'user_id' => $userId,
        ]);
    }
}
