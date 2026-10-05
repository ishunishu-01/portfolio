<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index()
    {
        return response()->json(\App\Models\Project::orderBy('sort_order')->get());
    }

    public function store(Request $request)
    {
        $project = \App\Models\Project::create($request->all());
        return response()->json($project, 201);
    }

    public function show(string $id)
    {
        return response()->json(\App\Models\Project::findOrFail($id));
    }

    public function update(Request $request, string $id)
    {
        $project = \App\Models\Project::findOrFail($id);
        $project->update($request->all());
        return response()->json($project);
    }

    public function destroy(string $id)
    {
        $project = \App\Models\Project::findOrFail($id);
        $project->delete();
        return response()->json(null, 204);
    }
}
