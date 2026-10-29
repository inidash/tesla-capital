<?php

namespace App\Mail;

use App\Models\Transaction;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class WithdrawalPendingMail extends Mailable implements ShouldQueue
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
            subject: 'Withdrawal Request Received - ' .
                $this->transaction->reference,
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.withdrawals.pending',
            with: [
                'transaction' => $this->transaction,
            ],
        );
    }
}