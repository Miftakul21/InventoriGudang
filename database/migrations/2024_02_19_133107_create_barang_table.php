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
        Schema::create('barang', function (Blueprint $table) {
            // $table->id();
            $table->char('kd_barang', 6)->primary();
            $table->char('id_kategori', 20);
            $table->string('nama_barang', 100);
            $table->integer('quantity')->nullable();
            $table->integer('stok_minimum')->nullable();
            $table->integer('harga');
            $table->string('image', 120);
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
        Schema::dropIfExists('barang');
    }
};