import React, { useState } from "react";
import { Head, usePage, router, Link } from "@inertiajs/react";
import Template from "@/Layout/Template";

const CreateKategori = () => {
    const { errors } = usePage().props;

    const [kategori, setKategori] = useState("");

    const handleStore = (e) => {
        e.preventDefault();

        router.post(
            "/kategori",
            {
                kategori: kategori,
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
            <Head title="InventoriApp - Tambah Kategori" />
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
                                        value={kategori}
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
                                        Simpan
                                    </button>
                                    <Link
                                        href="/user"
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

export default CreateKategori;
