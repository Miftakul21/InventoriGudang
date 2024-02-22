<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BarangController;
use App\Http\Controllers\KurirController;
use App\Http\Controllers\PesananController;
use App\Http\Controllers\PengirimanController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [AuthController::class, 'index'])->name('login')->middleware('guest');
Route::post('/auth', [AuthController::class, 'auth']);
Route::post('/logout', [AuthController::class, 'logout']);

Route::resource('/dashboard', App\Http\Controllers\DashboardController::class)->middleware('auth');
Route::resource('/user', App\Http\Controllers\UserController::class)->middleware('auth');
Route::resource('/customer', App\Http\Controllers\CustomerController::class)->middleware('auth');
Route::resource('/kategori', App\Http\Controllers\KategoriController::class)->middleware('auth');
Route::resource('/barang', App\Http\Controllers\BarangController::class)->middleware('auth');

Route::post('/update-barang', [BarangController::class, 'updateBarang'])->middleware('auth');

Route::resource('/barang-masuk', App\Http\Controllers\BarangMasukController::class)->middleware('auth');
Route::resource('/barang-keluar', App\Http\Controllers\BarangKeluarController::class)->middleware('auth');
Route::resource('/kurir', App\Http\Controllers\KurirController::class)->middleware('auth');
Route::post('/kurir-update', [KurirController::class, 'update']);

Route::resource('/pengiriman', App\Http\Controllers\PengirimanController::class)->middleware('auth');
Route::post('/pengiriman-status', [PengirimanController::class, 'update']);
Route::post('/pesanan', [PesananController::class, 'store']);