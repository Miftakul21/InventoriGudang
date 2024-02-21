<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Barang extends Model
{
    use HasFactory;

    protected $table = 'barang';
    // protected $primaryKey = 'kd_barang';
    protected $fillable = [
        'kd_barang',
        'id_kategori',
        'nama_barang',
        'quantity',
        'stok_minimum',
        'harga',
        'image'
    ];
}