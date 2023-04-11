<?php

namespace App\Actions\Conversation;

use App\Models\Conversation;

final class DeleteAllMessagesAction
{
    public function execute(
        int $id,
    ): void {
        Conversation::find($id)->messages()->delete();
    }
}