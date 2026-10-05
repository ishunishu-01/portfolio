<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index()
    {
        return response()->json(\App\Models\Message::latest()->get());
    }

    public function store(Request $request)
    {
        $message = \App\Models\Message::create($request->all());
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
}
