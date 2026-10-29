<?php

namespace App\Mail;

use App\Models\Transaction;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class DepositRejectedMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(
        public Transaction $transaction
    ) {
        $this->transaction->loadMissing('user');
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Deposit Not Confirmed - ' .
                $this->transaction->reference,
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.deposits.rejected',
            with: [
                'transaction' => $this->transaction,
            ],
        );
    }
}
