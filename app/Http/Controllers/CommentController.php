<?php

namespace App\Http\Controllers;

use App\Models\Comment;

use Illuminate\Http\Request;

use App\Actions\Comment\StoreCommentAction;
use App\Http\Resources\Comment\CommentCollection;
use App\Responses\Comment\CommentCollectionResponse;
use App\DataTransferObjects\Comment\CommentDataObject;

class CommentController extends Controller
{

    public function store(Request $request): CommentCollectionResponse
    {
        $commentDataObject = new CommentDataObject(
            $request->body,
            $request->post_id,
            $request->user()?->id,
        );

        (new StoreCommentAction())
            ->execute(...$commentDataObject->toArray());

        return new CommentCollectionResponse(
            new CommentCollection(
                Comment::where('post_id', $request->post_id)->get()
            ),
        );
    }
}
