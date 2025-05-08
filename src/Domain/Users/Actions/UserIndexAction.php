<?php

namespace Domain\Users\Actions;

use Domain\Users\Data\Resources\UserResource;
use Domain\Users\Models\User;

class UserIndexAction
{
    public function __invoke(?string $search = null, int $perPage = 10)
    {
        $users = User::query()
            ->when($search, function ($query, $search) {
                // Extrae filtros con prefijo (e.g. name:juan email:gmail)
                preg_match_all('/(\w+):([^\s]+)/', $search, $matches, PREG_SET_ORDER);
                $usedPrefixed = false;

                foreach ($matches as [, $key, $value]) {
                    if (in_array($key, ['name', 'email'])) {
                        $query->where($key, 'like', "%{$value}%");
                        $usedPrefixed = true;
                    }
                }

                // Si no se usaron prefijos, hacer búsqueda general
                if (!$usedPrefixed) {
                    $query->where(function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%")
                          ->orWhere('email', 'like', "%{$search}%");
                    });
                }
            })
            ->latest()
            ->paginate($perPage);

        return $users->through(fn ($user) => UserResource::fromModel($user));
    }
}
