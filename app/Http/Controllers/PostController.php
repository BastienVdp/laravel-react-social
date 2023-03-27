<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

use App\Actions\Post\StorePostAction;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Resources\Post\PostResource;
use App\Http\Resources\Post\PostCollection;
use App\Responses\Post\PostCollectionResponse;
use App\DataTransferObjects\Post\PostDataObject;
use App\Responses\Post\PostResourceResponse;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new PostCollectionResponse(
            new PostCollection(
                    Post::orderBy('created_at', 'DESC')
                        ->paginate(5)
            )
        );
    }

    public function profile(Request $request): PostCollectionResponse
    {
        return new PostCollectionResponse(
            new PostCollection(
                    Post::where('user_id', $request->id)
                        ->orderBy('created_at', 'DESC')
                        ->paginate(5)
            )
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): PostCollectionResponse
    {
        $postDataObject = new PostDataObject(
            $request->content,
            $request->images,
            $request->user()->id,
        );

        (new StorePostAction())
        ->execute(
            ...$postDataObject->toArray(),
        );

        return new PostCollectionResponse(
            new PostCollection(
                    Post::orderBy('created_at', 'DESC')
                        ->paginate(5)
            )
        );
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post, Request $request)
    {

        if($request->user()->id !== $post->user_id) {
            return abort(403, 'Unauthorize action');
        }

        $post->delete();

        return response('', 204);
    }
}
