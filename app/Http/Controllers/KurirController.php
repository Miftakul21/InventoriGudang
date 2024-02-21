<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Kurir;
use Inertia\Inertia;

class KurirController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $this->authorize('IsAdmin');
        $kurir = Kurir::all();
        return Inertia::render('Kurir',[
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
        // $this->authorize('IsAdmin');
        return Inertia::render('Form/CreateKurir');
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
            'id_kurir' => 'required|unique:kurir,id_kurir',
            'name' => 'required',
            'nomor_telepon' => 'required|max:20',
            'alamat' => 'required',
        ]);

        $insert = Kurir::create([
            'id_kurir' => $request->id_kurir,
            'name' => $request->name,
            'nomor_telepon' => $request->nomor_telepon,
            'alamat' => $request->alamat
        ]);

        if($insert){
            return redirect()->route('kurir.index')->with(['success' => 'Data berhasil simpan']);

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
    public function edit($id_kurir)
    {
        // $this->authorize('IsAdmin');
        $kurir = Kurir::where('id_kurir', $id_kurir)->get();

        return Inertia::render('Form/EditKurir', [
            'kurir' => $kurir
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
        $update = Kurir::where('id_kurir', $request->id_kurir)->update([
            // 'id_kuriri' => $request->id_kurir,
            'name' => $request->name,
            'nomor_telepon' => $request->nomor_telepon,
            'alamat' => $request->alamat
        ]);

        if($update) {
            return redirect()->route('kurir.index')->with(['success' => 'Data berhasil update']);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id_kurir)
    {
        // dd($id_kurir);
        $delete = Kurir::where('id_kurir', $id_kurir)->delete();
 
        if($delete) {
            return redirect()->route('kurir.index')->with(['success' => 'Data berhasil hapus']);
        }
    }
}