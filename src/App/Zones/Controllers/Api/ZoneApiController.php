<?php

namespace App\Zones\Controllers\Api;

use App\Http\Controllers\Controller;
use Domain\Zones\Actions\ZoneDestroyAction;
use Domain\Zones\Actions\ZoneIndexAction;
use Domain\Zones\Actions\ZoneStoreAction;
use Domain\Zones\Actions\ZoneUpdateAction;
use Domain\Zones\Models\Zone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ZoneApiController extends Controller
{
    /**
     * Lista todas las zonas con opción de búsqueda y paginación.
     */
    public function index(Request $request, ZoneIndexAction $action)
    {
        return response()->json($action($request->search, $request->integer('per_page', 10)));
    }

    /**
     * Crea una nueva zona.
     */
    public function store(Request $request, ZoneStoreAction $action)
    {
        // Validación de los datos de la zona
        $validator = Validator::make($request->all(), [
            'genre_name' => ['required', 'string', 'max:255'],
            'capacity' => ['required', 'integer', 'min:1'],
            'floor_id' => ['required', 'exists:floor,id'],
        ]);

        // Si la validación falla, devolvemos los errores
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Ejecutamos la acción para almacenar la nueva zona
        $zoneResource = $action($validator->validated());

        // Devolvemos la zona creada
        return response()->json([
            'message' => 'Zona creada exitosamente.',
            'zone' => $zoneResource,
        ], 201);
    }

    /**
     * Actualiza una zona existente.
     */
    public function update(Request $request, Zone $zone, ZoneUpdateAction $action)
    {
        // Validación de los datos de actualización de la zona
        $validator = Validator::make($request->all(), [
            'genre_name' => ['required', 'string', 'max:255'],
            'capacity' => ['required', 'integer', 'min:1'],
            'floor_id' => ['required', 'exists:floor,id'],
        ]);

        // Si la validación falla, devolvemos los errores
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Ejecutamos la acción para actualizar la zona
        $updatedZone = $action($zone, $validator->validated());

        // Devolvemos la zona actualizada
        return response()->json([
            'message' => 'Zona actualizada exitosamente.',
            'zone' => $updatedZone,
        ]);
    }

    /**
     * Elimina una zona.
     */
    public function destroy(Zone $zone, ZoneDestroyAction $action)
    {
        // Ejecutamos la acción para eliminar la zona
        $action($zone);

        // Devolvemos una respuesta de éxito
        return response()->json([
            'message' => 'Zona eliminada exitosamente.',
        ]);
    }
}
