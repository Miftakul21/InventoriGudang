import React, { useState } from "react";
import { Head, usePage, router, Link } from "@inertiajs/react";
import Template from "@/Layout/Template";

const EditKategori = () => {
    const { errors } = usePage().props;
    const { kategori } = usePage().props;

    console.log(kategori);

    const [kategoriName, setKategori] = useState(kategori.kategori);

    const handleStore = (e) => {
        e.preventDefault();

        router.put(
            `/kategori/${kategori.id}`,
            {
                kategori: kategoriName,
            },
            {
                onSuccess: () => {
                    Swal.fire({
                        title: "Simpan!",
                        text: "Data berhasil simpan",
                        icon: "success",
                    });
                },
            }
        );
    };

    return (
        <Template>
            <Head title="InventoriApp - Edit Kategori" />
            <div className="row">
                <div className="col-7">
                    <div className="card">
                        <div className="card-header font-weight-bold text-primary">
                            Form
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleStore}>
                                <div className="form-group">
                                    <label
                                        htmlFor="name"
                                        className="form-label font-weight-bold"
                                    >
                                        Kategori
                                    </label>
                                    <input
                                        type="text"
                                        id="kategori"
                                        className={
                                            errors.kategori
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        placeholder="Masukkan kategori"
                                        value={kategoriName}
                                        onChange={(e) =>
                                            setKategori(e.target.value)
                                        }
                                    />
                                    {errors.kategori && (
                                        <div className="invalid-feedback">
                                            {errors.kategori}
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <button
                                        type="submit"
                                        className="btn btn-primary mr-2"
                                    >
                                        Update
                                    </button>
                                    <Link
                                        href="/kategori"
                                        className="btn btn-secondary"
                                    >
                                        Batal
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Template>
    );
};

export default EditKategori;
