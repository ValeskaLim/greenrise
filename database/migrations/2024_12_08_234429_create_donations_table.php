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
        Schema::create('donations', function (Blueprint $table) {
            $table->id();
            // $table->unsignedBigInteger("user_id");
            // $table->unsignedBigInteger("event_id");
            $table->date("date");
            $table->integer("amount");
            $table->timestamps();

            $table->foreignId("user_id")->constrained('users')->onDelete("cascade");
            $table->foreignId("event_id")->constrained('events')->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('donations');
    }
};
