<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\User\UserCollection;
use App\Responses\User\UserCollectionResponse;
use App\Actions\Friendship\DenyFriendshipAction;
use App\Actions\Friendship\SendFriendshipAction;
use App\Actions\Friendship\BlockFriendshipAction;
use App\Actions\Friendship\AcceptFriendshipAction;
use App\Actions\Friendship\RemoveFriendshipAction;
use App\Actions\Friendship\UnblockFriendshipAction;
use App\Responses\Friendship\FriendshipHandleResponse;
use App\Http\Resources\Friendship\FriendshipCollection;
use App\Responses\Friendship\FriendshipCollectionResponse;
use Illuminate\Http\JsonResponse;

class FriendshipController extends Controller
{

    public function mine(Request $request): UserCollectionResponse
    {
        return new UserCollectionResponse(
            new UserCollection(
                User::find($request->recipient)->getFriends()
            ),
        );
    }

    public function mutual(Request $request): UserCollectionResponse
    {
        return new UserCollectionResponse(
            new UserCollection(
                User::find($request->user()->id)->getFriendsOfFriends()->take(2)
            ),
        );

    }

    public function all(Request $request): UserCollectionResponse
    {
        return new UserCollectionResponse(
            new UserCollection(
                User::find($request->user()->id)->getAllFriendships()
            )
        );
    }

    public function pending(Request $request): FriendshipCollectionResponse
    {
        return new FriendshipCollectionResponse(
            new FriendshipCollection(
                User::find($request->recipient)->getFriendRequests()
            )
        );
    }

    public function denied(Request $request): FriendshipCollectionResponse
    {
        return new FriendshipCollectionResponse(
            new FriendshipCollection(
                User::find($request->user()->id)->getDeniedFriendships()
            )
        );

    }

    public function blocked(Request $request): FriendshipCollectionResponse
    {
        return new FriendshipCollectionResponse(
            new FriendshipCollection(
                User::find($request->user()->id)->getBlockedFriendships()
            )
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function send(Request $request): JsonResponse
    {
        $callback = (new SendFriendshipAction())->execute(
            $request->sender,
            $request->recipient
        );

        return response()->json([
            'success' => $callback
        ]);
    }

    public function accept(Request $request): FriendshipHandleResponse
    {
        (new AcceptFriendshipAction())->execute(
            $request->sender,
            $request->recipient
        );

        return new FriendshipHandleResponse(
            new UserCollection(
                User::find($request->user()->id)->getFriends()
            ),
            new FriendshipCollection(
                User::find($request->recipient)->getPendingFriendships()
            )
        );
    }

    public function deny(Request $request): FriendshipHandleResponse
    {
        (new DenyFriendshipAction())->execute(
            $request->sender,
            $request->recipient
        );

        return new FriendshipHandleResponse(
            new UserCollection(
                User::find($request->recipient)->getFriends()
            ),
            new FriendshipCollection(
                User::find($request->recipient)->getPendingFriendships()
            )
        );
    }

    public function remove(Request $request): UserCollectionResponse
    {
        (new RemoveFriendshipAction())->execute(
            $request->sender,
            $request->recipient
        );

        return new UserCollectionResponse(
            new UserCollection(
                User::find($request->sender)->getFriends()
            ),
        );
    }

    public function block(Request $request): FriendshipHandleResponse
    {
        (new BlockFriendshipAction())->execute(
            $request->sender,
            $request->recipient
        );

        return new FriendshipHandleResponse(
            new UserCollection(
                User::find($request->sender)->getFriends()
            ),
            new FriendshipCollection(
                User::find($request->sender)->getPendingFriendships()
            ),
            new FriendshipCollection(
                User::find($request->sender)->getBlockedFriendships()
            )
        );
    }

    public function unblock(Request $request): FriendshipHandleResponse
    {
        (new UnblockFriendshipAction())->execute(
            $request->sender,
            $request->recipient
        );

        return new FriendshipHandleResponse(
            new UserCollection(
                User::find($request->sender)->getFriends()
            ),
            new FriendshipCollection(
                User::find($request->sender)->getPendingFriendships()
            ),
            new FriendshipCollection(
                User::find($request->sender)->getBlockedFriendships()
            )
        );
    }
}
