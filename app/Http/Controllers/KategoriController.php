<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Kategori;

class KategoriController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('IsAdmin');
        $kategori = Kategori::all();
        return Inertia::render('Kategori', [
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
        return Inertia::render('Form/CreateKategori');
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
            'kategori' => 'required'
        ]);

        $insert = Kategori::create([
            'kategori' => $request->kategori
        ]);

        if($insert) {
            return redirect()->route('kategori.index')->with(['success' => 'Data berhasil simpan']);
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
    public function edit(Kategori $kategori)
    {
        $this->authorize('IsAdmin');
        return Inertia::render('Form/EditKategori', [
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
    public function update(Kategori $kategori, Request $request)
    {
        // dd($request->all());

        $validation = $request->validate([
            'kategori' => 'required'
        ]);

        $update = $kategori->update([
            'kategori' => $request->kategori
        ]);

        if($update) {
            return redirect()->route('kategori.index')->with(['success' => 'Data berhasil simpan']);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Kategori $kategori)
    {
        $delete = $kategori->delete();

        if($delete) {
            return redirect()->route('kategori.index')->with(['success' => 'Data berhasil hapus']);
        }
    }
}