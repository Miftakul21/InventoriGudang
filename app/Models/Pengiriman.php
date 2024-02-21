<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengiriman extends Model
{
    use HasFactory;

    protected $table = 'pengiriman';
    protected $fillable = [
        'id_pengiriman',
        'id_customer',
        'id_kurir',
        'nomor_kendaraan',
        'nomor_pos',
        'tanggal',
        'penerima',
        'keterangan',
        'status',
    ];

}