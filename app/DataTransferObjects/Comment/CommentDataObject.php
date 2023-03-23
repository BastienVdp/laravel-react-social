<?php


namespace App\DataTransferObjects\Comment;

final class CommentDataObject
{
    public function __construct(
        private readonly string $body,
        private readonly int $postId,
        private readonly int $userId,
    ) {
    }

    /**
     * @return array
     */
    public function toArray(): array
    {
        return [
            'body' => $this->body,
            'postId' => $this->postId,
            'userId' => $this->userId,
        ];
    }
}
