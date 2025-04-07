<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Domain\Models\floors\Actions\FloorDestroyAction;
use Domain\Models\floors\Actions\FloorIndexAction;
use Domain\Models\floors\Actions\FloorStoreAction;
use Domain\Models\floors\Actions\FloorUpdateAction;
use Domain\Models\floors\Floor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class FloorApiController extends Controller
{
    /**
     * Lista todos los pisos con opción de búsqueda y paginación.
     */
    public function index(Request $request, FloorIndexAction $action)
    {
        return response()->json($action($request->search, $request->integer('per_page', 10)));
    }

    /**
     * Crea un nuevo piso.
     */
    public function store(Request $request, FloorStoreAction $action)
    {
        // Validación de los datos del piso
        $validator = Validator::make($request->all(), [
            'floor_number' => ['required', 'integer', 'min:1'],
            'capacity' => ['required', 'integer', 'min:1'],
        ]);

        // Si la validación falla, devolvemos los errores
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Ejecutamos la acción para almacenar el nuevo piso
        $floorResource = $action($validator->validated());

        // Devolvemos el piso creado
        return response()->json([
            'message' => 'Piso creado exitosamente.',
            'floor' => $floorResource,
        ], 201);
    }

    /**
     * Actualiza un piso existente.
     */
    public function update(Request $request, Floor $floor, FloorUpdateAction $action)
    {
        // Validación de los datos de actualización del piso
        $validator = Validator::make($request->all(), [
            'floor_number' => ['required', 'integer', 'min:1'],
            'capacity' => ['required', 'integer', 'min:1'],
        ]);

        // Si la validación falla, devolvemos los errores
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Ejecutamos la acción para actualizar el piso
        $updatedFloor = $action($floor, $validator->validated());

        // Devolvemos el piso actualizado
        return response()->json([
            'message' => 'Piso actualizado exitosamente.',
            'floor' => $updatedFloor,
        ]);
    }

    /**
     * Elimina un piso.
     */
    public function destroy(Floor $floor, FloorDestroyAction $action)
    {
        // Ejecutamos la acción para eliminar el piso
        $action($floor);

        // Devolvemos una respuesta de éxito
        return response()->json([
            'message' => 'Piso eliminado exitosamente.',
        ]);
    }
}
