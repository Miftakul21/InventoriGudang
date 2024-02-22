<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Pengiriman;
use App\Models\Barang;
use App\Models\Customer;
use App\Models\Kurir;
use App\Models\Kategori;
use App\Models\Pesanan;

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
        $pesanan = Pesanan::all();
        
        return Inertia::render('Pengiriman', [
            'pengiriman' => $pengiriman,
            'barang' => $barang,
            'customer' => $customer,
            'kurir' => $kurir,
            'pesanan' => $pesanan,
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
        $array = [];

        for($i = 0;  $i < count($request->all()['data']); $i++) {
            $array[] = [
                'id_pengiriman' => $request['data'][$i]['id_pengiriman'],
                'kd_barang' => $request['data'][$i]['kd_barang'],
                'jumlah' => $request['data'][$i]['jumlah'],
            ]; 
        }

        $validation = $request->validate([
            'id_pengiriman' => 'required',
            'id_customer' => 'required',
            'id_kurir' => 'required',
            'nomor_kendaraan' => 'required',
            'nomor_pos' => 'required',
            'tanggal' => 'required',
            'status' => 'kirim'
        ]);

        $insert = Pengiriman::create([
            'id_pengiriman' => $request->id_pengiriman,
            'id_customer' => $request->id_customer,
            'id_kurir' => $request->id_kurir,
            'nomor_kendaraan' => $request->nomor_kendaraan,
            'nomor_pos' => $request->nomor_pos,
            'tanggal' => $request->tanggal
        ]);

        Pesanan::insert($array);

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
    public function edit($id_pengiriman)
    {
        $barang = Barang::all();
        $customer = Customer::all();
        $kurir = Kurir::all();
        $kategori = Kategori::all();
        $pengiriman = Pengiriman::where('id_pengiriman', $id_pengiriman)->get();
        $pesanan = Pesanan::all();

        return Inertia::render('Form/StatusPengiriman', [
            'pengiriman' => $pengiriman,
            'kategori' => $kategori,
            'barang' => $barang,
            'kurir' => $kurir,
            'customer' => $customer,
            'pesanan' => $pesanan
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        // dd($request->all());

        $update = Pengiriman::where('id_pengiriman', $request->id_pengiriman)->update([
            'penerima' => $request->penerima,
            'status' => 'Diterima',
        ]);

        if($update) {
            return redirect()->route('pengiriman.index')->with(['success' => 'Data berhasil update']);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id_pengiriman)
    {
        Pesanan::where('id_pengiriman', $id_pengiriman)->delete();
        $delete = Pengiriman::where('id_pengiriman', $id_pengiriman)->delete();
        if($delete) {
            return redirect()->route('pengiriman.index')->with(['success' => 'Data berhasil simpan']);
        }
    }
}