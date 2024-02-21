import React, { useState, useRef } from "react";
import { Head, usePage, router, Link } from "@inertiajs/react";
import Template from "@/Layout/Template";

const EditBarang = () => {
    const { errors } = usePage().props;
    const { kategori } = usePage().props;
    const { barang } = usePage().props;

    const [values, setValues] = useState({
        kd_barang: barang[0].kd_barang,
        id_kategori: barang[0].id_kategori,
        nama_barang: barang[0].nama_barang,
        quantity: barang[0].quantity,
        stok_minimum: barang[0].stok_minimum,
        harga: barang[0].harga,
    });

    const image = useRef();

    const handleChange = (e) => {
        const { value, name } = e.target;

        setValues((values) => ({
            ...values,
            [name]: value,
        }));
    };

    const handleStore = (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append("kd_barang", values.kd_barang);
        formData.append("nama_barang", values.nama_barang);
        formData.append("id_kategori", values.id_kategori);
        formData.append("quantity", values.quantity);
        formData.append("stok_minimum", values.stok_minimum);
        formData.append("harga", values.harga);
        formData.append("image", image.current.files[0]);

        router.post(`/update-barang`, formData, {
            onSuccess: () => {
                Swal.fire({
                    title: "Update!",
                    text: "Data berhasil update",
                    icon: "success",
                });
            },
            onError: (error) => {
                console.log(error);
            },
        });
    };

    return (
        <Template>
            <Head title="InventoriApp - Tambah Barang" />
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
                                        htmlFor="kode_barang"
                                        className="form-label font-weight-bold"
                                    >
                                        Kode Barang
                                    </label>
                                    <input
                                        id="kode_barang"
                                        type="text"
                                        value={values.kd_barang}
                                        className={
                                            errors.kd_barang
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        placeholder="Kode Barang"
                                        name="kd_barang"
                                        onChange={handleChange}
                                        disabled
                                    />
                                    {errors.kd_barang && (
                                        <div className="invalid-feedback">
                                            {errors.kd_barang}
                                        </div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label
                                        htmlFor="nama_barang"
                                        className="form-label font-weight-bold"
                                    >
                                        Nama Barang
                                    </label>
                                    <input
                                        id="nama_barang"
                                        type="text"
                                        className={
                                            errors.nama_barang
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        name="nama_barang"
                                        value={values.nama_barang}
                                        onChange={handleChange}
                                    />
                                    {errors.nama_barang && (
                                        <div className="invalid-feedback">
                                            {errors.nama_barang}
                                        </div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label
                                        htmlFor="id_kategori"
                                        className="form-label font-weight-bold"
                                    >
                                        Kategori
                                    </label>
                                    <select
                                        id="id_kategori"
                                        className={
                                            errors.id_kategori
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        defaultValue={values.id_kategori}
                                        name="id_kategori"
                                        onChange={handleChange}
                                    >
                                        <option value="">Kategori</option>
                                        {kategori.map((kategori) => (
                                            <option
                                                key={kategori.id}
                                                value={kategori.id}
                                            >
                                                {kategori.kategori}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.id_kategori && (
                                        <div className="invalid-feedback">
                                            {errors.id_kategori}
                                        </div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label
                                        htmlFor="quantity"
                                        className="form-label font-weight-bold"
                                    >
                                        Quantity
                                    </label>
                                    <input
                                        id="quantity"
                                        type="number"
                                        min="0"
                                        className="form-control"
                                        name="quantity"
                                        value={values.quantity}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label
                                        htmlFor="stok_minimum"
                                        className="form-label font-weight-bold"
                                    >
                                        Stok Minimum
                                    </label>
                                    <input
                                        id="stok_minimum"
                                        type="number"
                                        min="0"
                                        className="form-control"
                                        name="stok_minimum"
                                        value={values.stok_minimum}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label
                                        htmlFor="harga"
                                        className="form-label font-weight-bold"
                                    >
                                        Harga
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="harga"
                                        value={values.harga}
                                        name="harga"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label
                                        htmlFor="image"
                                        className="form-label font-weight-bold"
                                    >
                                        Image
                                    </label>
                                    <input
                                        id="image"
                                        type="file"
                                        className={
                                            errors.image
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        name="image"
                                        ref={image}
                                    />
                                    <small>
                                        Image: jpg, png, jpeg: (max 2mb)
                                    </small>
                                    {errors.image && (
                                        <div className="invalid-feedback">
                                            {errors.image}
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary mr-2">
                                        Update
                                    </button>
                                    <Link
                                        href="/barang"
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

export default EditBarang;
