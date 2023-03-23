<?php

namespace App\Responses\User;

use App\Http\Resources\User\UserCollection;
use Illuminate\Contracts\Support\Responsable;

final class UserCollectionResponse implements Responsable
{
    public function __construct(
        private readonly UserCollection $userCollection,
        private readonly int $status = 200,
    ) {
    }

    public function toResponse($request)
    {
        return response()->json(
            $this->userCollection,
            $this->status,
        );
    }
}
