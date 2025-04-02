<?php

namespace Domain\Books\Actions;

use Domain\Boooks\Models\Book;

class ZoneDestroyAction
{
    public function __invoke(Book $book): void
    {
        $book->delete();
    }
}