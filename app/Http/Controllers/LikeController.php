<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;
use App\Actions\Like\StoreLikeAction;
use App\Http\Resources\Like\LikeResource;
use App\Http\Resources\Like\LikeCollection;
use App\Responses\Like\LikeCollectionResponse;


class LikeController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */

    public function like(Request $request): LikeCollectionResponse
    {

       (new StoreLikeAction())->execute($request->post_id, $request->user()->id);

        return new LikeCollectionResponse(
            new LikeCollection(
                Like::where('post_id', $request->post_id)->get()
            )
        );
    }
    /**
     * Delete a newly created resource in storage.
     */
    public function unlike(Request $request, int $id): LikeCollectionResponse
    {
        (new StoreLikeAction())->execute($id, $request->user()->id);

        return new LikeCollectionResponse(
            new LikeCollection(
                Like::where('post_id', $id)->get()
            )
        );
    }

}
