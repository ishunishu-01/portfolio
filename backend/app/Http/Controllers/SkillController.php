<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SkillController extends Controller
{
    public function index()
    {
        return response()->json(\App\Models\Skill::orderBy('sort_order')->get());
    }

    public function store(Request $request)
    {
        $skill = \App\Models\Skill::create($request->all());
        return response()->json($skill, 201);
    }

    public function show(string $id)
    {
        return response()->json(\App\Models\Skill::findOrFail($id));
    }

    public function update(Request $request, string $id)
    {
        $skill = \App\Models\Skill::findOrFail($id);
        $skill->update($request->all());
        return response()->json($skill);
    }

    public function destroy(string $id)
    {
        $skill = \App\Models\Skill::findOrFail($id);
        $skill->delete();
        return response()->json(null, 204);
    }
}
