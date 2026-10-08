<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class MessageReply extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $recipientName,
        public string $originalSubject,
        public string $replyBody,
        public ?string $attachmentPath = null,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Re: ' . $this->originalSubject,
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.message-reply',
        );
    }

    public function attachments(): array
    {
        $attachments = [];
        if ($this->attachmentPath) {
            $attachments[] = \Illuminate\Mail\Mailables\Attachment::fromStorage($this->attachmentPath);
        }
        return $attachments;
    }
}
