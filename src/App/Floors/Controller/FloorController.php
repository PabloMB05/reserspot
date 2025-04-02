<?php

namespace App\Floors\Controller;

use Domain\Models\floors\Actions\FloorDestroyAction;
use Domain\Models\floors\Actions\FloorIndexAction;
use Domain\Models\floors\Actions\FloorStoreAction;
use Domain\Models\floors\Actions\FloorUpdateAction;
use Domain\Models\floors\Floor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use Inertia\Response;




class FloorController extends Controller
{
    // Mostrar todos los pisos
    public function index()
    {
        return Inertia::render('floors/index');
    }

    // Mostrar el formulario de creación de un nuevo piso
    public function create()
    {
        return Inertia::render('floors/create');
    }

    // Almacenar un nuevo piso
    public function store(Request $request, FloorStoreAction $action)
    {
        // Validación de los datos del formulario
        $validator = Validator::make($request->all(), [
            'floor_number' => ['required', 'integer', 'unique:floors'],
            'capacity' => ['required', 'integer'],
        ]);

        // Si la validación falla, se vuelve a la página anterior con los errores
        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        // Ejecutar la acción para almacenar el nuevo piso
        $action($validator->validated());

        // Redirigir a la página de listado de pisos con un mensaje de éxito
        return redirect()->route('floors.index')
            ->with('success', __('messages.floors.created'));
    }

    // Mostrar el formulario para editar un piso existente
    public function edit(Request $request, Floor $floor)
    {
        return Inertia::render('floors/Edit', [
            'floor' => $floor,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
        ]);
    }

    // Actualizar un piso existente
    public function update(Request $request, Floor $floor, FloorUpdateAction $action)
    {
        // Validación de los datos del formulario
        $validator = Validator::make($request->all(), [
            'floor_number' => ['required', 'integer', Rule::unique('floors')->ignore($floor->id)],
            'capacity' => ['required', 'integer'],
        ]);

        // Si la validación falla, se vuelve a la página anterior con los errores
        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        // Ejecutar la acción para actualizar el piso
        $action($floor, $validator->validated());

        // Construir la URL de redirección para mantener la paginación
        $redirectUrl = route('floors.index');

        // Añadir parámetros de página y por número de elementos por página si existen
        if ($request->has('page')) {
            $redirectUrl .= "?page=" . $request->query('page');
            if ($request->has('perPage')) {
                $redirectUrl .= "&per_page=" . $request->query('perPage');
            }
        }

        // Redirigir a la página de listado de pisos con un mensaje de éxito
        return redirect($redirectUrl)
            ->with('success', __('messages.floors.updated'));
    }

    // Eliminar un piso
    public function destroy(Floor $floor, FloorDestroyAction $action)
    {
        // Ejecutar la acción para eliminar el piso
        $action($floor);

        // Redirigir a la página de listado de pisos con un mensaje de éxito
        return redirect()->route('floors.index')
            ->with('success', __('messages.floors.deleted'));
    }
}


