<?php

namespace App\Responses\Friendship;

use App\Http\Resources\Friendship\FriendshipCollection;
use Illuminate\Contracts\Support\Responsable;

final class FriendshipCollectionResponse implements Responsable
{
    public function __construct(
        private readonly FriendshipCollection $friendCollection,
        private readonly int $status = 200,
    ) {
    }

    public function toResponse($request)
    {
        return response()->json(
            $this->friendCollection,
            $this->status,
        );
    }
}
