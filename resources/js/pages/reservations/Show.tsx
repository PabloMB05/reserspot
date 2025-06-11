import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface ReservationProps {
  reservation: {
    id: string;
    centro_comercial: string;
    zona: string;
    piso: string;
    fecha_inicio: string;
    hora_inicio: string;
    fecha_fin: string;
    hora_fin: string;
  };
}

export default function Show({ reservation }: ReservationProps) {
  return (
    <AppLayout>
      <Head title="Detalles de la reserva" />

      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Reserva confirmada</h1>

        <div className="space-y-2 text-lg bg-white p-4 rounded shadow">
          <p><strong>Centro comercial:</strong> {reservation.centro_comercial}</p>
          <p><strong>Zona:</strong> {reservation.zona}</p>
          <p><strong>Piso:</strong> {reservation.piso}</p>
          <p><strong>Desde:</strong> {reservation.fecha_inicio} a las {reservation.hora_inicio}</p>
          <p><strong>Hasta:</strong> {reservation.fecha_fin} a las {reservation.hora_fin}</p>
        </div>

        <div className="mt-6">
          <Link href="/dashboard">
            <button className="bg-[#a8e6cf] hover:bg-[#8ddcc2] text-black font-semibold py-2 px-4 rounded">
              Volver al dashboard
            </button>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
