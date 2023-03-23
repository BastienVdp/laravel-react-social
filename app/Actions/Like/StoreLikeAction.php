<?php

namespace App\Actions\Like;

use App\Models\Like;
use Illuminate\Database\Eloquent\Model;

final class StoreLikeAction
{
    public function execute(
        string $likeableType,
        int $likeableId,
        int $userId,
    ): void {
        $like = Like::where([
            'likeable_id' => $likeableId,
            'likeable_type' => 'App\\Models\\'.$likeableType,
            'user_id' => $userId
        ]);
        if(
           !$like->exists()
        ){
            Like::create([
                'likeable_id' => $likeableId,
                'likeable_type' => 'App\\Models\\'.$likeableType,
                'user_id' => $userId
            ]);
        } else {
            $like->delete();
        }
    }
}
