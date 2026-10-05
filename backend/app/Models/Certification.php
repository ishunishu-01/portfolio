<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Certification extends Model
{
    protected $fillable = [
        'name', 'organization', 'issue_date', 'expiry_date',
        'credential_id', 'certificate_url', 'certificate_image',
        'category', 'icon', 'sort_order',
    ];
}
