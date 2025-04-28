<?php

namespace Domain\Books\Actions;

use Domain\Bookcases\Models\Bookcase;
use Domain\Books\Data\Resources\BookResource;
use Domain\Books\Models\Book;
use Domain\Models\floors\Floor;
use Domain\Loans\Models\Loan;
use Domain\Zones\Models\Zone;

class BookIndexAction
{
    public function __invoke(?array $search = null, int $perPage = 10)
    {
        $title = $search[0];
        $genres = $search[1];
        $author = $search[2];
        $pages = $search[3];
        $publisher = $search[4];
        $floor = $search[5];
        $zone = $search[6];
        $bookcase = $search[7];
        $isbn = $search[8];

        $floorModel = Floor::query()->when($floor !== "null", function ($query) use ($floor) {
            $query->where('floor_number', '=', $floor);
        })->first();

        $floor_id = $floorModel ? $floorModel->id : null;

        $zones = Zone::query()->when($zone !== "null", function ($query) use ($zone) {
            $query->where('number', '=', $zone);
        })
        ->when($floor !== "null" && $floor_id !== null, function ($query) use ($floor_id) {
            $query->where('floor_id', '=', $floor_id);
        })->pluck('id');

        $bookcases = Bookcase::query()
            ->when($bookcase !== "null", function ($query) use ($bookcase) {
                $query->where('number', '=', $bookcase);
            })
            ->when($zone !== "null" || $floor !== 'null', function ($query) use ($zones) {
                $query->whereIn('zone_id', $zones);
            })->pluck('id');

        $libros_prestados = Loan::where('is_active', '=', true)->pluck('book_id');

        $book = Book::query()
        ->when($title !== "null", function ($query) use ($title) {
            $query->where('title', 'ILIKE', '%'.$title.'%');
        })
        ->when($genres !== "null", function ($query) use ($genres) {
            $query->where('genres', 'ILIKE', '%'.$genres.'%');
        })
        ->when($author !== "null", function ($query) use ($author) {
            $query->where('author', 'ILIKE', '%'.$author.'%');
        })
        ->when($pages !== "null", function ($query) use ($pages) {
            $query->where('length', '=', $pages);
        })
        ->when($publisher !== "null", function ($query) use ($publisher) {
            $query->where('editor', 'ILIKE', '%'.$publisher.'%');
        })
        ->when($bookcases !== "null", function ($query) use ($bookcases) {
            $query->whereIn('bookcase_id', $bookcases);
        })
        ->when($isbn !== "null", function ($query) use ($isbn) {
            $query->where('isbn', 'ILIKE', '%'.$isbn.'%');
        })
            ->latest()
            ->paginate($perPage);

        return $book->through(fn ($book) => BookResource::fromModel($book));
    }
}