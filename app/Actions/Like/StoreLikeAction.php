<?php

namespace App\Actions\Like;

use App\Models\Like;
use App\Models\Post;

final class StoreLikeAction
{
    public function execute(
        int $postId,
        int $userId,
    ): void {

        if(!count(
            Like::where([
                'post_id' => $postId,
                'user_id' => $userId
            ])->get()
        )){
            Post::find($postId)->likes()->create([
                'user_id' => $userId
            ]);
        } else {
            Like::where([
                'post_id' => $postId,
                'user_id' => $userId
            ])->delete();
        }
    }
}
