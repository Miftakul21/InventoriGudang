<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\BarangKeluar;
use App\Models\Barang;

class BarangKeluarController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $barangKeluar = BarangKeluar::all();
        $barang = Barang::all();

        return Inertia::render('BarangKeluar', [
            'barang' => $barang,
            'barangKeluar' => $barangKeluar 
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
        $barangKeluar = BarangKeluar::all();
        $barang = Barang::all();
        return Inertia::render('Form/CreateBarangKeluar', [
            'barang' => $barang,
            'barangKeluar' => $barangKeluar 
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
            'stok_keluar' => 'required',
            'deskripsi' => 'required',
            'tanggal' => 'required'
        ]);

        $time = new \DateTime();

        $insert = BarangKeluar::create([
            'kd_barang' => $request->kd_barang,
            'stok_awal' => $request->stok_awal,
            'stok_keluar' => $request->stok_keluar,
            'deskripsi' => $request->deskripsi,
            'tanggal' => $request->tanggal.' '.$time->format('H:i:s')
        ]);

        // Update stok barang keluar (berkurang)
        $dataBarang = Barang::where('kd_barang', $request->kd_barang)->get();
        Barang::where('kd_barang', $request->kd_barang)->update([
            'quantity' => $dataBarang[0]->quantity - $request->stok_keluar
        ]);

        if($insert) {
            return redirect()->route('barang-keluar.index');
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
    public function edit($id)
    {
        //
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
    public function destroy(BarangKeluar $barangKeluar)
    {
        $dataStokAwal = Barang::where('kd_barang', $barangKeluar->kd_barang)->get();
        $updateStok = $dataStokAwal[0]->quantity + $barangKeluar->stok_keluar;

        Barang::where('kd_barang', $barangKeluar->kd_barang)->update([
            'quantity' => $updateStok
        ]);

        $delete = BarangKeluar::where('kd_barang', $barangKeluar->kd_barang)->delete();

        if($delete) {
            return redirect()->route('barang-keluar.index')->with(['success' => 'Data berhasil hapus']);
        }
    }
}