<?php

namespace App\Actions\Conversation;

use App\Models\Conversation;

final class DeleteConversationAction
{
    public function execute(
        int $id,
    ): void {
        Conversation::find($id)->delete();

    }
}