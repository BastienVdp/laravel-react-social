<?php

namespace App\Responses\Like;

use App\Http\Resources\Like\LikeCollection;
use Illuminate\Contracts\Support\Responsable;

final class LikeCollectionResponse implements Responsable
{
    public function __construct(
        private readonly LikeCollection $likeCollection,
        private readonly int $status = 200,
    ) {
    }

    public function toResponse($request)
    {
        return response()->json(
            $this->likeCollection,
            $this->status,
        );
    }
}
