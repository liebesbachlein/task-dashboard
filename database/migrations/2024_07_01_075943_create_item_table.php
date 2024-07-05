<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */

    private $table_name = 'item_table';
    
    public function up(): void
    {
        Schema::create( $this->table_name, function (Blueprint $table) {
            $table->id();
            $table->string('name', length: 255);
            $table->date('birth_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('item_table');
    }
};
