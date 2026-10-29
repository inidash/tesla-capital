<?php

namespace App\Mail;

use App\Models\Payment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class RoiPayoutMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(
        public Payment $payment
    ) {
        $this->payment->loadMissing([
            'investment.user',
            'investment.plan',
            'transaction',
        ]);
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'ROI Payment Credited - Investment #' .
                $this->payment->investment?->id,
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.roi.paid',
            with: [
                'payment' => $this->payment,
            ],
        );
    }
}