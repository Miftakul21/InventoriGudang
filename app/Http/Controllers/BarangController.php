<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Barang;
use App\Models\Kategori;
use Illuminate\Support\Facades\File;


class BarangController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $barang = Barang::all();
        $kategori = Kategori::all();
        
        return Inertia::render('Barang', [
            'barang' => $barang,
            'kategori' => $kategori
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
        
        $kategori = Kategori::all();
        return Inertia::render('Form/CreateBarang', [
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
        // dd($request->all());
        $validation = $request->validate([
            'kd_barang' => 'required|min:6|unique:barang,kd_barang',
            'id_kategori' => 'required',
            'nama_barang' => 'required',
            'image' => 'mimes:jpg,jpeg,png|max:2048'
        ]);

        $nameImage = uniqid().'_'.$request->image->getClientOriginalName();
        $request->image->move('foto_barang', $nameImage);

        $insert = Barang::create([
            'kd_barang' => $request->kd_barang,
            'id_kategori' => $request->id_kategori,
            'nama_barang' => $request->nama_barang,
            'quantity' => $request->quantity,
            'stok_minimum' => $request->stok_minimum,
            'harga' => $request->harga,
            'image' => $nameImage  
        ]);

        if($insert) {
            return redirect()->route('barang.index')->with(['success' => 'Data berhasil simpan']);
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
    public function edit($kd_barang)
    {
        $this->authorize('IsAdmin');
        // dd($kd_barang);
        $barang = Barang::where('kd_barang', $kd_barang)->get(); 
        $kategori = Kategori::all();
        return Inertia::render('Form/EditBarang', [
            'barang' => $barang,
            'kategori' => $kategori
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $kd_barang)
    {
        dd($request->all());    

        $validation = $request->validate([
            'id_kategori' => 'required',
            'nama_barang' => 'required',
            'image' => 'image|mimes:jpg,jpeg,png|max:2048'
        ]);

        $datas = Barang::where('kd_barang', $kd_barang)->get();

        $dataImage = $request->image;
        $nameImage = '';

        if(is_null($dataImage)) {
            $nameImage = $datas[0]->image;
        } else {
            if(File::exists(public_path('foto_barang/'.$dataImage))) {
                File::delete(public_path('foto_barang/'.$dataImage));
            }

            $nameImage = uniqid().'_'.$request->image->getClientOriginalName();
            $request->image->move('foto_barang', $nameImage);
        }

        $update = Barang::where('kd_barang', $kd_barang)->update([
            'id_kategori' => $request->id_kategori,
            'nama_barang' => $request->nama_barang,
            'quantity' => $request->quantity,
            'stok_minimum' => $request->stok_minimum,
            'harga' => $request->harga,
            'image' => $nameImage
        ]);

        if($update){
            return redirect()->route('barang.index')->with(['success' => 'Data berhasil update']);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($kd_barang)
    {
        $data = Barang::where('kd_barang', $kd_barang)->get();
        $dataImage = $data[0]->image;

        if(File::exists(public_path('foto_barang/'.$dataImage))){
            File::delete(public_path('foto_barang/'.$dataImage));
        }

        $delete = Barang::where('kd_barang', $kd_barang)->delete();

        if($delete) {
            return redirect()->route('barang.index')->with(['success' => 'Data berhasil hapus']);
        }
    }

    public function updateBarang(Request $request)
    {
        // dd($request->all());

        $validation = $request->validate([
            'id_kategori' => 'required',
            'nama_barang' => 'required',
            // 'image' => 'mimes:jpg,jpeg,png|max:2048'
        ]);

        $datas = Barang::where('kd_barang', $request->kd_barang)->get();

        $dataImage = $request->image;
        $nameImage = '';

        if($dataImage == 'undefined' || $dataImage == '' || is_null($dataImage)) {
            $nameImage = $datas[0]->image; // ambil data sebelumnya
        } else {
            $dataImageBefore = $datas[0]->image;
            if(File::exists(public_path('foto_barang/'.$dataImageBefore))) {
                File::delete(public_path('foto_barang/'.$dataImageBefore));
            }

            $nameImage = uniqid().'_'.$request->image->getClientOriginalName();
            $request->image->move('foto_barang', $nameImage);
        }

        $update = Barang::where('kd_barang', $request->kd_barang)->update([
            'id_kategori' => $request->id_kategori,
            'nama_barang' => $request->nama_barang,
            'quantity' => $request->quantity,
            'stok_minimum' => $request->stok_minimum,
            'harga' => $request->harga,
            'image' => $nameImage
        ]);

        if($update){
            return redirect()->route('barang.index')->with(['success' => 'Data berhasil update']);
        }
    }
}