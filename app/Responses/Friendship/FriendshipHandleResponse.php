<?php

namespace App\Responses\Friendship;

use App\Http\Resources\Friendship\FriendshipCollection;
use App\Http\Resources\User\UserCollection;
use Illuminate\Contracts\Support\Responsable;

final class FriendshipHandleResponse implements Responsable
{
    public function __construct(
        private readonly UserCollection $userCollection,
        private readonly FriendshipCollection|Array $pendingCollection = [],
        private readonly FriendshipCollection|Array $blockedCollection = [],
        private readonly int $status = 200,
    ) {}

    public function toResponse($request)
    {
        return response()->json([
            'friends' => $this->userCollection,
            'pending_requests' => $this->pendingCollection,
            'blocked_requests' => $this->blockedCollection,
            'status' => $this->status,
        ]);
    }
}
