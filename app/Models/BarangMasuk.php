<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BarangMasuk extends Model
{
    use HasFactory;
    protected $table = 'barang_masuk';
    protected $primaryKey = 'id' ;
    protected $fillable = [
        'kd_barang',
        'stok_awal',
        'stok_masuk',
        'deskripsi',
        'tanggal',
    ];

}