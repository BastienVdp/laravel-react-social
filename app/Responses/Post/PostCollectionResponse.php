<?php

namespace App\Responses\Post;

use App\Http\Resources\Post\PostCollection;
use Illuminate\Contracts\Support\Responsable;

final class PostCollectionResponse implements Responsable
{
    public function __construct(
        private readonly PostCollection $postCollection,
        private readonly int $status = 200,
    ) {
    }

    public function toResponse($request)
    {
        return response()->json(
            $this->postCollection,
            $this->status,
        );
    }
}
