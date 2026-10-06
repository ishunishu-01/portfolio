<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('education', function (Blueprint $table) {
            $table->renameColumn('field', 'field_of_study');
            $table->boolean('is_current')->default(false)->after('end_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('education', function (Blueprint $table) {
            $table->renameColumn('field_of_study', 'field');
            $table->dropColumn('is_current');
        });
    }
};
