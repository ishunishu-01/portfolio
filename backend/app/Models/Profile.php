<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $table = 'profile';

    protected $fillable = [
        'name', 'email', 'phone', 'location', 'tagline', 'bio',
        'github_url', 'linkedin_url', 'website_url',
        'photo', 'resume', 'available',
    ];

    protected $casts = [
        'available' => 'boolean',
    ];
}
