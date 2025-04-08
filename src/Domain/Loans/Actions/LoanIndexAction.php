<?php

namespace Domain\Loans\Actions;

use Domain\Loans\Models\Loan;
use Domain\Loans\Data\Resources\LoanResource;
use Domain\Users\Models\User;
use Domain\Books\Models\Book;

class LoanIndexAction
{
    public function __invoke(?array $search = null, int $perPage = 10)
    {
        // Inicializar las variables de filtro con valores por defecto
        $userId = $bookId = $dueDate = $isActive = $isLate = null;

        if ($search) {
            // Asignar los valores de búsqueda si están presentes en el array
            $userId = isset($search[0]) && $search[0] !== "null" ? $search[0] : null;
            $bookId = isset($search[1]) && $search[1] !== "null" ? $search[1] : null;
            $dueDate = isset($search[2]) && $search[2] !== "null" ? $search[2] : null;
            $isActive = isset($search[3]) && $search[3] !== "null" ? $search[3] : null;
            $isLate = isset($search[4]) && $search[4] !== "null" ? $search[4] : null;
        }

        // Construir la consulta para los préstamos con los filtros proporcionados
        $loansQuery = Loan::query()
            ->when($userId !== null, function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->when($bookId !== null, function ($query) use ($bookId) {
                $query->where('book_id', $bookId);
            })
            ->when($dueDate !== null, function ($query) use ($dueDate) {
                $query->whereDate('due_date', $dueDate);
            })
            ->when($isActive !== null, function ($query) use ($isActive) {
                $query->where('is_active', $isActive);
            })
            ->when($isLate !== null, function ($query) use ($isLate) {
                $query->where('is_late', $isLate);
            })
            ->latest(); // Ordenar por fecha de creación de forma descendente

        // Paginación
        $paginated = $loansQuery->paginate($perPage);

        // Transformar los resultados con el recurso LoanResource
        return $paginated->through(fn ($loan) => LoanResource::fromModel($loan));
    }
}
