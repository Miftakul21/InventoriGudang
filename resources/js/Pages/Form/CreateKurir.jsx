import React, { useState } from "react";
import { Head, usePage, router, Link } from "@inertiajs/react";
import Template from "@/Layout/Template";

const CreateKurir = () => {
    const { errors } = usePage().props;

    const [idKurir, setIdKurir] = useState("KR");
    const [name, setName] = useState("");
    const [nomorTelepon, setNomorTelepon] = useState("");
    const [alamat, setAlamat] = useState("");

    const handleStore = (e) => {
        e.preventDefault();

        router.post(
            "/kurir",
            {
                id_kurir: idKurir,
                name: name,
                nomor_telepon: nomorTelepon,
                alamat: alamat,
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
            <Head title="InventoriApp - Create Customer" />
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
                                        htmlFor="id_kurir"
                                        className="form-label font-weight-bold"
                                    >
                                        Id Kurir
                                    </label>
                                    <input
                                        type="text"
                                        id="id_kurir"
                                        className={
                                            errors.id_kurir
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        placeholder="Masukkan id kurir"
                                        value={idKurir}
                                        onChange={(e) =>
                                            setIdKurir(e.target.value)
                                        }
                                    />
                                    {errors.id_kurir && (
                                        <div className="invalid-feedback">
                                            {errors.id_kurir}
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="name"
                                        className="form-label font-weight-bold"
                                    >
                                        Nama
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className={
                                            errors.name
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        placeholder="Masukkan nama"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                    {errors.name && (
                                        <div className="invalid-feedback">
                                            {errors.name}
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="nomorTelepon"
                                        className="form-label font-weight-bold"
                                    >
                                        Nomor Telepon
                                    </label>
                                    <input
                                        type="text"
                                        id="nomorTelepon"
                                        className={
                                            errors.nomor_telepon
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        placeholder="Masukkan nomor telepon"
                                        value={nomorTelepon}
                                        onChange={(e) =>
                                            setNomorTelepon(e.target.value)
                                        }
                                    />
                                    {errors.nomor_telepon && (
                                        <div className="invalid-feedback">
                                            {errors.nomor_telepon}
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="alamat"
                                        className="form-label font-weight-bold"
                                    >
                                        Alamat
                                    </label>
                                    <textarea
                                        className={
                                            errors.alamat
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        placeholder="Masukkan deskripsi"
                                        id="deskripsi"
                                        style={{ height: 100 }}
                                        value={alamat}
                                        onChange={(e) =>
                                            setAlamat(e.target.value)
                                        }
                                    ></textarea>

                                    {errors.alamat && (
                                        <div className="invalid-feedback">
                                            {errors.alamat}
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

export default CreateKurir;
