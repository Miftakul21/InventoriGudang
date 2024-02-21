import React, { useState, useRef } from "react";
import { Head, usePage, router, Link } from "@inertiajs/react";
import Template from "@/Layout/Template";

const CreateBarangMasuk = () => {
    const { errors } = usePage().props;
    const { barang } = usePage().props;
    const { barangMasuk } = usePage().props;

    const [values, setValues] = useState({
        kd_barang: "",
        stok_masuk: 0,
        deskripsi: "",
        tanggal: "",
    });

    const handleChange = (e) => {
        const { value, name } = e.target;

        setValues((values) => ({
            ...values,
            [name]: value,
        }));
    };

    const handleStore = (e) => {
        e.preventDefault();
        router.post(
            "/barang-masuk",
            {
                kd_barang: values.kd_barang,
                stok_awal: Number(stokAwal.join()),
                stok_masuk: Number(values.stok_masuk),
                deskripsi: values.deskripsi,
                tanggal: values.tanggal,
            },
            {
                onSuccess: () => {
                    Swal.fire({
                        title: "Simpan!",
                        text: "Data berhasil simpan",
                        icon: "success",
                    });
                },
                onError: (error) => {
                    console.log(error);
                },
            }
        );
    };

    let stokAwal = barang
        .filter((item) => {
            return item.kd_barang == values.kd_barang;
        })
        .map((item) => {
            return item.quantity;
        });

    return (
        <Template>
            <Head title="InventoriApp - Tambah Barang Masuk" />
            <div className="row">
                <div className="col-7">
                    <div className="card">
                        <div className="card-header font-weight-bold text-primary">
                            Form
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleStore}>
                                <div className="row">
                                    <div className="col-4">
                                        <div className="form-group">
                                            <label
                                                htmlFor="tanggal"
                                                className="form-label font-weight-bold"
                                            >
                                                Tanggal
                                            </label>
                                            <input
                                                type="date"
                                                className={
                                                    errors.tanggal
                                                        ? "form-control is-invalid"
                                                        : "form-control"
                                                }
                                                name="tanggal"
                                                onChange={handleChange}
                                            />
                                            {errors.tanggal && (
                                                <div className="invalid-feedback">
                                                    {errors.tanggal}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <label
                                                htmlFor="kd_barang"
                                                className="form-label font-weight-bold"
                                            >
                                                Barang
                                            </label>
                                            <select
                                                name="kd_barang"
                                                id="kd_barang"
                                                className={
                                                    errors.kd_barang
                                                        ? "form-control is-invalid"
                                                        : "form-control"
                                                }
                                                defaultValue={""}
                                                onChange={handleChange}
                                            >
                                                <option value="">Barang</option>
                                                {barang.map((barang) => (
                                                    <option
                                                        key={barang.kd_barang}
                                                        value={barang.kd_barang}
                                                    >
                                                        {barang.kd_barang} |{" "}
                                                        {barang.nama_barang}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.kd_tanggal && (
                                                <div className="invalid-feedback">
                                                    {errors.kd_tanggal}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="form-group">
                                            <label
                                                htmlFor="stok_awal"
                                                className="form-label font-weight-bold"
                                            >
                                                Stok Awal
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                className="form-control"
                                                value={stokAwal}
                                                onChange={handleChange}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="stok_masuk"
                                        className="form-label font-weight-bold"
                                    >
                                        Stok Barang Masuk
                                    </label>
                                    <input
                                        type="number"
                                        id="stok_masuk"
                                        min="0"
                                        className={
                                            errors.stok_masuk
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        name="stok_masuk"
                                        placeholder="0"
                                        onChange={handleChange}
                                    />
                                    {errors.stok_masuk && (
                                        <div className="invalid-feedback">
                                            {errors.stok_masuk}
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="deskripsi" className="">
                                        Deskripsi
                                    </label>
                                    <textarea
                                        className={
                                            errors.deskripsi
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        placeholder="Masukkan deskripsi..."
                                        id="deskripsi"
                                        style={{ height: 100 }}
                                        name="deskripsi"
                                        onChange={handleChange}
                                    ></textarea>
                                    {errors.deskripsi && (
                                        <div className="invalid-feedback">
                                            {errors.deskripsi}
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary mr-2">
                                        Simpan
                                    </button>
                                    <Link
                                        href="/barang-masuk"
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

export default CreateBarangMasuk;
