<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;
use App\Actions\Like\StoreLikeAction;
use App\Http\Resources\Like\LikeResource;
use App\Http\Resources\Like\LikeCollection;
use App\Models\Comment;
use App\Responses\Like\LikeCollectionResponse;


class LikeController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */

    public function like(Request $request)
    {
        (new StoreLikeAction())->execute(
            $request->likeable_type,
            $request->likeable_id,
            $request->user()->id
        );

        return new LikeCollectionResponse(
            new LikeCollection(
                Like::where('likeable_id', $request->likeable_id)
                    ->where('likeable_type', 'App\\Models\\'.$request->likeable_type)
                    ->where('user_id', $request->user()->id)
                    ->get()
            )
        );

    }
    /**
     * Delete a newly created resource in storage.
     */
    public function unlike(Request $request, int $likeable_id, string $likeable_type)
    {


        (new StoreLikeAction())->execute(
            $likeable_type,
            $likeable_id,
            $request->user()->id
        );

        return new LikeCollectionResponse(
            new LikeCollection(
                Like::where('likeable_id', $request->likeable_id)
                    ->where('likeable_type', 'App\\Models\\'.$request->likeable_type)
                    ->where('user_id', $request->user()->id)
                    ->get()
            )
        );
    }

}
