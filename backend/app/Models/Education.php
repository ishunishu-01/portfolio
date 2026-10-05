<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    protected $fillable = [
        'institution', 'degree', 'field', 'start_date', 'end_date',
        'grade', 'description', 'sort_order',
    ];
}
