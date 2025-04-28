<?php

namespace App\Notifications;

use Domain\Books\Models\Book;
use Domain\Loans\Models\Loan;
use Domain\Users\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class confirmaciondereserva extends Notification implements ShouldQueue
{
    use Queueable;

    public $book;

    /**
     * Create a new notification instance.
     */
    public function __construct( Book $book)
    {
        $this->book = $book;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {

        return (new MailMessage)
        ->line('¡Hola '.$notifiable->name.'!')
        ->line('¡Ya puedes leer '.$this->book->title.'! Tu turno ha llegado.')
        ->action('Reserva ahora', url('/books'))
        ->line('¡No dejes pasar la oportunidad!');

    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}