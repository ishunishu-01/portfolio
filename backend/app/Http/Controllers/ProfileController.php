<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Profile;

class ProfileController extends Controller
{
    public function index()
    {
        $profile = Profile::first();
        if (!$profile) {
            $profile = Profile::create([
                'name' => 'S.P. Ishara Sewwandi',
                'email' => 'ishara@example.com',
                'tagline' => 'Full-Stack Developer'
            ]);
        }
        return response()->json($profile);
    }

    public function update(Request $request)
    {
        $profile = Profile::first();
        if ($profile) {
            $profile->update($request->all());
        } else {
            $profile = Profile::create($request->all());
        }
        return response()->json($profile);
    }
}
