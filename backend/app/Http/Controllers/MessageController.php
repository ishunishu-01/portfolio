<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\MessageReply;

class MessageController extends Controller
{
    public function index()
    {
        return response()->json(\App\Models\Message::latest()->get());
    }

    public function store(Request $request)
    {
        $data = $request->all();
        if ($request->hasFile('attachment')) {
            $data['attachment'] = $request->file('attachment')->store('attachments', 'public');
        }
        $message = \App\Models\Message::create($data);
        return response()->json($message, 201);
    }

    public function show(string $id)
    {
        return response()->json(\App\Models\Message::findOrFail($id));
    }

    public function update(Request $request, string $id)
    {
        $message = \App\Models\Message::findOrFail($id);
        $message->update($request->all());
        return response()->json($message);
    }

    public function destroy(string $id)
    {
        $message = \App\Models\Message::findOrFail($id);
        $message->delete();
        return response()->json(null, 204);
    }

    public function reply(Request $request, string $id)
    {
        $request->validate([
            'body' => 'required|string|min:1',
        ]);

        $message = \App\Models\Message::findOrFail($id);

        $attachmentPath = null;
        if ($request->hasFile('attachment')) {
            $attachmentPath = $request->file('attachment')->store('reply_attachments');
        }

        Mail::to($message->email)->send(new MessageReply(
            recipientName:   $message->name,
            originalSubject: $message->subject ?? 'Your message',
            replyBody:       $request->input('body'),
            attachmentPath:  $attachmentPath,
        ));

        // Mark as read after replying
        $message->update(['is_read' => true]);

        return response()->json(['sent' => true]);
    }
}
