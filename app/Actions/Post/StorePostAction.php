<?php

namespace App\Actions\Post;

use App\Models\Post;
use App\Actions\Image\StoreImageAction;

final class StorePostAction
{
    public function execute(
        string $content,
        array $images,
        int $userId,
    ): void {

        $post = Post::create([
            'content' => $content,
            'user_id' => $userId,
        ]);

        if(isset($images)) {
            (new StoreImageAction())
            ->execute(
                $images,
                $post
            );
        }

    }
}
