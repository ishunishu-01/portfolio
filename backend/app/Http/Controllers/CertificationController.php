<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CertificationController extends Controller
{
    public function index()
    {
        return response()->json(\App\Models\Certification::orderBy('sort_order')->get());
    }

    public function store(Request $request)
    {
        $certification = \App\Models\Certification::create($request->all());
        return response()->json($certification, 201);
    }

    public function show(string $id)
    {
        return response()->json(\App\Models\Certification::findOrFail($id));
    }

    public function update(Request $request, string $id)
    {
        $certification = \App\Models\Certification::findOrFail($id);
        $certification->update($request->all());
        return response()->json($certification);
    }

    public function destroy(string $id)
    {
        $certification = \App\Models\Certification::findOrFail($id);
        $certification->delete();
        return response()->json(null, 204);
    }
}
