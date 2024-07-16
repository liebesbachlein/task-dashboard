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
            $table->string('email', length: 255);
            $table->integer('event_id')->unsigned();
            $table->integer('user_id')->unsigned();
            $table->unique(['email', 'event_id']);
            $table->boolean('isOneMonthChecked');
            $table->boolean('isOneWeekChecked');
            $table->boolean('isThreeDaysChecked');
            $table->boolean('isOneDayChecked');
            $table->foreign('event_id')->references('id')->on('event_table')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('email')->references('email')->on('users')->onDelete('cascade');
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
