<?php


namespace App\DataTransferObjects\Post;

final class PostDataObject
{
    public function __construct(
        private readonly string $content,
        private readonly array $images,
        private readonly int $userId,
    ) {
    }

    /**
     * @return array
     */
    public function toArray(): array
    {
        return [
            'content' => $this->content,
            'images' => $this->images,
            'userId' => $this->userId,
        ];
    }
}
