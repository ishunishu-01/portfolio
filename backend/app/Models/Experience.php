<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $fillable = [
        'company', 'position', 'location', 'start_date', 'end_date',
        'description', 'technologies', 'achievements', 'is_current', 'sort_order',
    ];

    protected $casts = [
        'technologies' => 'array',
        'achievements' => 'array',
        'is_current'   => 'boolean',
    ];
}
