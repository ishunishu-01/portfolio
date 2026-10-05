<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EducationController extends Controller
{
    public function index()
    {
        return response()->json(\App\Models\Education::orderBy('sort_order')->get());
    }

    public function store(Request $request)
    {
        $education = \App\Models\Education::create($request->all());
        return response()->json($education, 201);
    }

    public function show(string $id)
    {
        return response()->json(\App\Models\Education::findOrFail($id));
    }

    public function update(Request $request, string $id)
    {
        $education = \App\Models\Education::findOrFail($id);
        $education->update($request->all());
        return response()->json($education);
    }

    public function destroy(string $id)
    {
        $education = \App\Models\Education::findOrFail($id);
        $education->delete();
        return response()->json(null, 204);
    }
}
