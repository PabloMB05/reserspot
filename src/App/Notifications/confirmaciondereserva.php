<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ConfirmacionReservaParking extends Notification implements ShouldQueue
{
    use Queueable;

    protected $datos;

    public function __construct(array $datos)
    {
        $this->datos = $datos;
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Confirmación de reserva de plaza')
            ->greeting('¡Hola ' . $notifiable->name . '!')
            ->line('Tu reserva ha sido confirmada.')
            ->line('📍 Plaza: ' . $this->datos['plaza'])
            ->line('🏙️ Zona: ' . $this->datos['zona'])
            ->line('📅 Desde: ' . $this->datos['fecha_inicio'] . ' a las ' . $this->datos['hora_inicio'])
            ->line('📅 Hasta: ' . $this->datos['fecha_fin'] . ' a las ' . $this->datos['hora_fin'])
            ->line('✅ Gracias por usar ReserSpot Zenia.')
            ->action('Ver mi reserva', url('/dashboard'));
    }

    public function toArray(object $notifiable): array
    {
        return [];
    }
}
