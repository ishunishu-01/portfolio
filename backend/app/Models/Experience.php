<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $fillable = [
        'company', 'role', 'location', 'start_date', 'end_date',
        'description', 'technologies', 'is_current', 'sort_order',
    ];

    protected $casts = [
        'technologies' => 'array',
        'is_current'   => 'boolean',
    ];
}
