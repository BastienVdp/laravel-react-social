<?php

namespace App\Responses\Comment;

use App\Http\Resources\Comment\CommentCollection;
use Illuminate\Contracts\Support\Responsable;

final class CommentCollectionResponse implements Responsable
{
    public function __construct(
        private readonly CommentCollection $commentCollection,
        private readonly int $status = 200,
    ) {
    }

    public function toResponse($request)
    {
        return response()->json(
            $this->commentCollection,
            $this->status,
        );
    }
}
