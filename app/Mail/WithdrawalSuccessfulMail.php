<?php

namespace App\Mail;

use App\Models\Transaction;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class WithdrawalSuccessfulMail extends Mailable implements ShouldQueue
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
            subject: 'Withdrawal Successful - ' .
                $this->transaction->reference,
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.withdrawals.successful',
            with: [
                'transaction' => $this->transaction,
            ],
        );
    }
}