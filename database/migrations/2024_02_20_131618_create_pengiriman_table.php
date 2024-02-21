<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pengiriman', function (Blueprint $table) {
            // $table->id();
            $table->string('id_pengiriman', 10);
            $table->char('id_pelanggan', 5);
            $table->char('id_kurir', 6);
            $table->string('nomor_kendaraan', 20);
            $table->string('nomor_pos', 8);
            $table->date('tanggal');
            $table->string('penerima', 120)->nullable();
            $table->string('keterangan', 125)->nullable();
            $table->string('status', 20)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pengiriman');
    }
};