<?php

namespace App\Notifications;

use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ConfirmacionReservaParking extends Notification
{
    protected array $datos;

    public function __construct(array $datos)
    {
        $this->datos = $datos;
    }

    /**
     * Define los canales de notificación.
     */
    public function via($notifiable): array
    {
        return ['mail'];
    }

    /**
     * Construye el mensaje de correo.
     */
    // public function toMail($notifiable): MailMessage
    // {
    //     return (new MailMessage)
    //         ->subject('Confirmación de reserva de plaza')
    //         ->greeting('¡Hola ' . $notifiable->name . '!')
    //         ->line('Tu reserva ha sido confirmada.')
    //         ->line('📍 Plaza: ' . $this->datos['plaza'])
    //         ->line('🏙️ Zona: ' . $this->datos['zona'])
    //         ->line('📅 Desde: ' . $this->datos['fecha_inicio'] . ' a las ' . $this->datos['hora_inicio'])
    //         ->line('📅 Hasta: ' . $this->datos['fecha_fin'] . ' a las ' . $this->datos['hora_fin'])
    //         ->line('✅ Gracias por usar ReserSpot Zenia.')
    //         ->action('Ver mi reserva', url('/dashboard'))
    //         ->salutation('Saludos, ReserSpot Zenia');
    // }
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Confirmación de Reserva de Parking')
            ->greeting('Hola ' . $notifiable->name)
            ->line('Tu reserva ha sido confirmada con éxito.')
            ->line('Centro comercial: ' . $this->datos['centro_comercial'])
            ->line('📍 Zona: ' . $this->datos['zona'])
            ->line('🏙️ Piso: ' . $this->datos['piso'])
            ->line('📅 Desde: ' . $this->datos['fecha_inicio'] . ' a las ' . $this->datos['hora_inicio'])
            ->line('📅 Hasta:  ' . $this->datos['fecha_fin'] . ' a las ' . $this->datos['hora_fin'])
            ->line('Gracias por utilizar ReserSpot')
            ->action('Ver mi reserva', url('/dashboard'))
            ->salutation('Saludos, ReserSpot');
    }



    /**
     * Representación de la notificación como array (opcional).
     */
    public function toArray($notifiable): array
    {
        return [
            'tipo' => 'confirmacion_reserva',
            'plaza' => $this->datos['plaza'],
            'zona' => $this->datos['zona'],
            'inicio' => $this->datos['fecha_inicio'] . ' ' . $this->datos['hora_inicio'],
            'fin' => $this->datos['fecha_fin'] . ' ' . $this->datos['hora_fin'],
        ];
    }
}
