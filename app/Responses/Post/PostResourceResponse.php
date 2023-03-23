<?php

namespace App\Responses\Post;

use App\Http\Resources\Post\PostResource;
use Illuminate\Contracts\Support\Responsable;

final class PostResourceResponse implements Responsable
{
    public function __construct(
        private readonly PostResource $postResource,
        private readonly int $status = 200,
    ) {
    }

    public function toResponse($request)
    {
        return response()->json(
            $this->postResource,
            $this->status,
        );
    }
}
