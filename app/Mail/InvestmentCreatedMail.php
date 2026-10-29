<?php

namespace App\Mail;

use App\Models\Investment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class InvestmentCreatedMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(
        public Investment $investment
    ) {
        $this->investment->loadMissing([
            'user',
            'plan',
        ]);
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your Investment is Active - Investment #' .
                $this->investment->id,
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.investments.created',
            with: [
                'investment' => $this->investment,
            ],
        );
    }
}