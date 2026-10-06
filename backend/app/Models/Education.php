<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    protected $fillable = [
        'institution', 'degree', 'field_of_study', 'start_date', 'end_date',
        'grade', 'description', 'sort_order', 'is_current', 'highlights',
    ];

    protected $casts = [
        'is_current' => 'boolean',
        'highlights' => 'array',
    ];
}
