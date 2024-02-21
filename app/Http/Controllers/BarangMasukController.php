<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\BarangMasuk;
use App\Models\Barang;

class BarangMasukController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $barangMasuk = BarangMasuk::all();
        $barang = Barang::all();

        return Inertia::render('BarangMasuk', [
            'barang' => $barang,
            'barangMasuk' => $barangMasuk 
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $this->authorize('IsAdmin');
        $barangMasuk = BarangMasuk::all();
        $barang = Barang::all();
        return Inertia::render('Form/CreateBarangMasuk', [
            'barang' => $barang,
            'barangMasuk' => $barangMasuk 
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $validation = $request->validate([
            'kd_barang' => 'required',
            'stok_awal' => 'required',
            'stok_masuk' => 'required',
            'deskripsi' => 'required',
            'tanggal' => 'required'
        ]);

        $time = new \DateTime();

        $insert = BarangMasuk::create([
            'kd_barang' => $request->kd_barang,
            'stok_awal' => $request->stok_awal,
            'stok_masuk' => $request->stok_masuk,
            'deskripsi' => $request->deskripsi,
            'tanggal' => $request->tanggal.' '.$time->format('H:i:s')
        ]);

        // Update stok barang masuk (bertambah)
        $dataBarang = Barang::where('kd_barang', $request->kd_barang)->get();
        Barang::where('kd_barang', $request->kd_barang)->update([
            'quantity' => $dataBarang[0]->quantity + $request->stok_masuk
        ]);

        if($insert) {
            return redirect()->route('barang-masuk.index');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(BarangMasuk $barangMasuk)
    {
        // return Inertia::render('Form/EditBarangMasuk', [
        //     'barang' => $barang,
        //     'barangMasuk' => $barangMasuk
        // ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(BarangMasuk $barangMasuk)
    {
        // dd($barangMasuk->stok_masuk);

        // Update stok barang (berkurang)
        $dataStokAwal = Barang::where('kd_barang', $barangMasuk->kd_barang)->get();
        $updateStok =  $dataStokAwal[0]->quantity - $barangMasuk->stok_masuk;

        Barang::where('kd_barang', $barangMasuk->kd_barang)->update([
            'quantity' => $updateStok
        ]);

        // $delete = $barangMasuk->delete();
        $delete = BarangMasuk::where('kd_barang', $barangMasuk->kd_barang)->delete();

        if($delete) {
            return redirect()->route('barang-masuk.index')->with(['success' => 'Data berhasil hapus']);
        }
    }
}