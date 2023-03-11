<?php

namespace App\Http\Controllers;


use App\Models\Like;
use App\Models\Post;
use App\Http\Requests\LikeRequest;
use App\Http\Resources\LikeResource;
use Illuminate\Support\Facades\Request;


class LikeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */

    public function like(LikeRequest $request)
    {

        $post = Post::find($request->post_id);

        if(!count(
            Like::where([
                'post_id' => $request->post_id,
                'user_id' => $request->user_id
            ])->get())
        ){
            $post->likes()->create([
                'user_id' => $request->user_id
            ]);
        }

        return response()->json([
            'likes' => LikeResource::collection($post->likes),
        ]);


        // return redirect()->back();
    }

    public function unlike(LikeRequest $request, $id)
    {
        $like = Like::where([
            'post_id' => $id,
            'user_id' => $request->user_id
        ]);

        if($like) {
            $like->delete();
        }


        $post = Post::find($id);

        return response()->json([
            'likes' => LikeResource::collection($post->likes)
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
