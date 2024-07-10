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
        Schema::create('notification_table', function (Blueprint $table) {
            $table->increments('id')->primary();
            $table->string('email', length: 255)->unique();
            $table->integer('menu_item_id')->unsigned();
            $table->foreign('menu_item_id')->references('id')->on('menu_item_table')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notification_table');
    }
};
