<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BarangKeluar extends Model
{
    use HasFactory;

    protected $table = 'barang_keluar';
    protected $primaryKey = 'id';
    protected $fillable = [
        'kd_barang',
        'stok_awal',
        'stok_keluar',
        'deskripsi',
        'tanggal',
    ];
}