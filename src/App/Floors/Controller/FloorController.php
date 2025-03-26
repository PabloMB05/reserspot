<?php

namespace App\Floors\Controller;

use Domain\Models\floors\floor;  // Asegúrate de que el modelo "Floor" esté correctamente importado
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Core\Controllers\Controller;

class FloorController extends Controller
{
    /**
     * Muestra una lista de todos los pisos con filtrado y paginación.
     */
    public function index(Request $request)
    {
        $floors = floor::all();
        // Pasar los datos a la vista de Inertia

        return Inertia::render('floor/index', ['floors'=>$floors]);  // Devuelve los datos como respuesta a la vista
    }
}
