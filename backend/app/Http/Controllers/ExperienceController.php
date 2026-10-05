<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ExperienceController extends Controller
{
    public function index()
    {
        return response()->json(\App\Models\Experience::orderBy('sort_order')->get());
    }

    public function store(Request $request)
    {
        $experience = \App\Models\Experience::create($request->all());
        return response()->json($experience, 201);
    }

    public function show(string $id)
    {
        return response()->json(\App\Models\Experience::findOrFail($id));
    }

    public function update(Request $request, string $id)
    {
        $experience = \App\Models\Experience::findOrFail($id);
        $experience->update($request->all());
        return response()->json($experience);
    }

    public function destroy(string $id)
    {
        $experience = \App\Models\Experience::findOrFail($id);
        $experience->delete();
        return response()->json(null, 204);
    }
}
