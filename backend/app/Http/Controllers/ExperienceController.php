<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Experience;

class ExperienceController extends Controller
{
    /** Convert the textarea achievements string into an array before saving */
    private function prepareData(Request $request): array
    {
        $data = $request->all();

        // Achievements comes as a newline-separated string from the frontend textarea
        if (isset($data['achievements']) && is_string($data['achievements'])) {
            $data['achievements'] = array_values(
                array_filter(
                    array_map('trim', explode("\n", $data['achievements']))
                )
            );
        }

        // Technologies may come as a comma-separated string if sent as text
        if (isset($data['technologies']) && is_string($data['technologies'])) {
            $data['technologies'] = array_values(
                array_filter(
                    array_map('trim', explode(',', $data['technologies']))
                )
            );
        }

        // Ensure is_current is boolean
        if (isset($data['is_current'])) {
            $data['is_current'] = filter_var($data['is_current'], FILTER_VALIDATE_BOOLEAN);
        }

        return $data;
    }

    public function index()
    {
        return response()->json(Experience::orderBy('sort_order')->get());
    }

    public function store(Request $request)
    {
        $experience = Experience::create($this->prepareData($request));
        return response()->json($experience, 201);
    }

    public function show(string $id)
    {
        return response()->json(Experience::findOrFail($id));
    }

    public function update(Request $request, string $id)
    {
        $experience = Experience::findOrFail($id);
        $experience->update($this->prepareData($request));
        return response()->json($experience);
    }

    public function destroy(string $id)
    {
        $experience = Experience::findOrFail($id);
        $experience->delete();
        return response()->json(null, 204);
    }
}
