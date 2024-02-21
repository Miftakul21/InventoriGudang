<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Pengiriman;
use App\Models\Barang;
use App\Models\Customer;
use App\Models\Kurir;
use App\Models\Kategori;


class PengirimanController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pengiriman = Pengiriman::all();
        $barang = Barang::all();
        $customer = Customer::all();
        $kurir = Kurir::all();
        
        return Inertia::render('Pengiriman', [
            'pengiriman' => $pengiriman,
            'barang' => $barang,
            'customer' => $customer,
            'kurir' => $kurir 
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $kd_barang = "KRM".date('Ymd').date('His');
        $barang = Barang::all();
        $customer = Customer::all();
        $kurir = Kurir::all();
        $kategori = Kategori::all();

        return Inertia::render('Form/CreatePengiriman', [
            'kd_barang' => $kd_barang,
            'barang' => $barang,
            'customer' => $customer,
            'kurir' => $kurir,
            'kategori' => $kategori
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

        $validation = $request->validate([
            'id_pengiriman' => 'required',
            'id_customer' => 'required',
            'id_kurir' => 'required',
            'nomor_kendaraan' => 'required',
            'nomor_pos' => 'required',
            'tanggal' => 'required'
        ]);

        $insert = Pengiriman::create([
            'id_pengiriman' => $request->id_pengiriman,
            'id_customer' => $request->id_customer,
            'id_kurir' => $request->id_kurir,
            'nomor_kendaraan' => $request->nomor_kendaraan,
            'nomor_pos' => $request->nomor_pos,
            'tanggal' => $request->tanggal
        ]);

        if($insert) {
            return redirect()->route('pengiriman.index')->with(['success' => 'Data berhasil simpan']);
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
    public function destroy($id)
    {
        //
    }
}