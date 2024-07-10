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
        Schema::create('event_table', function (Blueprint $table) {
            $table->increments('id')->primary();
            $table->string('name', length: 255);
            $table->dateTime('since');
            $table->dateTime('until');
            $table->string('additional_info', length: 255);
            $table->integer('menu_item_id')->unsigned();
            $table->foreign('menu_item_id')->references('id')->on('menu_item_table')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_table');
    }
};
