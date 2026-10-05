<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title', 'description', 'technologies', 'image',
        'github_url', 'live_url', 'category', 'featured', 'sort_order',
    ];

    protected $casts = [
        'technologies' => 'array',
        'featured'     => 'boolean',
    ];
}
