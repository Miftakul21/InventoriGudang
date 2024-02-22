import React, { useState } from "react";
import { Head, usePage, router, Link } from "@inertiajs/react";
import Template from "@/Layout/Template";
import { values } from "lodash";

const CreatePengiriman = () => {
    const { errors } = usePage().props;
    const { kd_barang } = usePage().props;
    const { customer } = usePage().props;
    const { kurir } = usePage().props;
    const { kategori } = usePage().props;
    const { barang } = usePage().props;

    const [valuesPengiriman, setValuesPengiriman] = useState({
        id_pengiriman: kd_barang,
        id_customer: "",
        id_kurir: "",
        nomor_kendaraan: "",
        nomor_pos: "",
        tanggal: "",
    });

    const handleChangePengiriman = (e) => {
        const { name, value } = e.target;
        setValuesPengiriman((item) => ({
            ...item,
            [name]: value,
        }));
    };

    const handleStore = (e) => {
        e.preventDefault();
        router.post(
            "/pengiriman",
            {
                id_pengiriman: kd_barang,
                id_customer: valuesPengiriman.id_customer,
                id_kurir: valuesPengiriman.id_kurir,
                nomor_kendaraan: valuesPengiriman.nomor_kendaraan,
                nomor_pos: valuesPengiriman.nomor_pos,
                tanggal: valuesPengiriman.tanggal,
                data: [...valuesBarang],
            },
            {
                onSuccess: () => {
                    console.log("berhasil cuy data pengirim");
                },
                onError: (error) => {
                    console.log("Error data pengirim " + error);
                },
            }
        );
    };

    // Get customer name
    let customerName = customer
        .filter((item) => {
            return item.id == valuesPengiriman.id_customer;
        })
        .map((item) => {
            return item.name;
        });

    // Get customer address
    let customerAddress = customer
        .filter((item) => {
            return item.id == valuesPengiriman.id_customer;
        })
        .map((item) => {
            return item.alamat;
        });

    let kurirName = kurir
        .filter((item) => {
            return item.id_kurir == valuesPengiriman.id_kurir;
        })
        .map((item) => {
            return item.name;
        });

    // Form list pesanan
    const [valuesBarang, setValuesBarang] = useState([]);

    const handleChangePesanan = (e, index) => {
        const { name, value } = e.target;
        const listInputs = [...valuesBarang];
        listInputs[index][name] = value;
        setValuesBarang(valuesBarang);
    };

    const handleBarang = (kd_barang) => {
        $("#barangModal").modal("toggle");
        let dataBarang = barang.filter((item) => {
            return item.kd_barang == kd_barang;
        });
        let dataKategori = kategori.filter((item) => {
            return item.id == dataBarang[0].id_kategori;
        });

        setValuesBarang([
            ...valuesBarang,
            {
                id_pengiriman: valuesPengiriman.id_pengiriman,
                kd_barang: dataBarang[0].kd_barang,
                nama_barang: dataBarang[0].nama_barang,
                kategori: dataKategori[0].kategori,
                jumlah: 0,
            },
        ]);
    };

    const handleDeleteForm = (index) => {
        const form = [...valuesBarang];
        form.splice(index, 1);
        setValuesBarang(form);
    };

    return (
        <>
            <Template>
                <Head title="InventoriApp - Create Customer" />
                <div className="row">
                    <div className="col-8">
                        <div className="card">
                            <div className="card-header font-weight-bold text-primary">
                                Form Data Pengiriman
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleStore}>
                                    <div className="form-group">
                                        <label
                                            htmlFor="name"
                                            className="form-label font-weight-bold"
                                        >
                                            ID Pengiriman
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            className={
                                                errors.id_pengiriman
                                                    ? "form-control is-invalid"
                                                    : "form-control"
                                            }
                                            name="id_pengiriman"
                                            value={
                                                valuesPengiriman.id_pengiriman
                                            }
                                            onChange={handleChangePengiriman}
                                            disabled
                                        />
                                        {errors.id_pengiriman && (
                                            <div className="invalid-feedback">
                                                {errors.id_pengiriman}
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label
                                            htmlFor="name"
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
                                            value={valuesPengiriman.tanggal}
                                            onChange={handleChangePengiriman}
                                        />
                                        {errors.tanggal && (
                                            <div className="invalid-feedback">
                                                {errors.tanggal}
                                            </div>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label
                                            htmlFor="id_customer"
                                            className="form-label font-weight-bold"
                                        >
                                            Pelanggan
                                        </label>
                                        <select
                                            name="id_customer"
                                            id="id_customer"
                                            className={
                                                errors.id_customer
                                                    ? "form-control is-invalid"
                                                    : "form-control"
                                            }
                                            defaultValue={""}
                                            onChange={handleChangePengiriman}
                                        >
                                            <option value="">Pelanggan</option>
                                            {customer.map((item) => (
                                                <option
                                                    key={item.id}
                                                    value={item.id}
                                                >
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.id_customer && (
                                            <div className="invalid-feedback">
                                                {errors.id_customer}
                                            </div>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label
                                            htmlFor="nama_customer"
                                            className="form-label font-weight-bold"
                                        >
                                            Nama Customer
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={customerName}
                                            disabled
                                        />
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
                                            id="deskripsi"
                                            style={{ height: 100 }}
                                            placeholder={customerAddress}
                                            disabled
                                        ></textarea>
                                    </div>

                                    <div className="form-group">
                                        <label
                                            htmlFor="id_kurir"
                                            className="form-label font-weight-bold"
                                        >
                                            ID Kurir
                                        </label>
                                        <select
                                            name="id_kurir"
                                            id="id_kurir"
                                            className={
                                                errors.id_kurir
                                                    ? "form-control is-invalid"
                                                    : "form-control"
                                            }
                                            defaultValue={""}
                                            onChange={handleChangePengiriman}
                                        >
                                            <option value="">Kurir</option>
                                            {kurir.map((item) => (
                                                <option
                                                    key={item.id_kurir}
                                                    value={item.id_kurir}
                                                >
                                                    {item.id_kurir}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.id_kurir && (
                                            <div className="invalid-feedback">
                                                {errors.id_kurir}
                                            </div>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label
                                            htmlFor="nama_kurir"
                                            className="form-label font-weight-bold"
                                        >
                                            Nama Kurir
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={kurirName}
                                            disabled
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label
                                            htmlFor="nomor_kendaraan"
                                            className="form-label font-weight-bold"
                                        >
                                            No Kendaraan
                                        </label>
                                        <input
                                            id="nomor_kendaraan"
                                            type="text"
                                            className={
                                                errors.nomor_kendaraan
                                                    ? "form-control is-inavlid"
                                                    : "form-control"
                                            }
                                            name="nomor_kendaraan"
                                            value={
                                                valuesPengiriman.nomor_kendaraan
                                            }
                                            onChange={handleChangePengiriman}
                                        />
                                        {errors.nomor_kendaraan && (
                                            <div className="invalid-feedback">
                                                {errors.nomor_kendaraan}
                                            </div>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label
                                            htmlFor="nomor_pos"
                                            className="form-label font-weight-bold"
                                        >
                                            No Pos
                                        </label>
                                        <input
                                            id="nomor_pos"
                                            type="text"
                                            className={
                                                errors.nomor_pos
                                                    ? "form-control is-invalid"
                                                    : "form-control"
                                            }
                                            name="nomor_pos"
                                            value={valuesPengiriman.nomor_pos}
                                            onChange={handleChangePengiriman}
                                        />
                                    </div>

                                    <hr className="sidebar-divider my-2" />

                                    <div className="d-flex justify-content-end">
                                        <a
                                            className="btn btn-warning btn-sm"
                                            data-toggle="modal"
                                            data-target="#barangModal"
                                        >
                                            <i className="fas fa-plus mr-2"></i>
                                            Tambah
                                        </a>
                                    </div>

                                    <table className="table mt-3 mb-3">
                                        <thead>
                                            <tr>
                                                <th>Kode Barang</th>
                                                <th>Nama Barang</th>
                                                <th>Kategori</th>
                                                <th style={{ width: 200 }}>
                                                    Jumlah
                                                </th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {valuesBarang.map(
                                                (formInputs, index) => {
                                                    return (
                                                        <tr>
                                                            <td>
                                                                {
                                                                    formInputs.kd_barang
                                                                }
                                                                <input
                                                                    type="hidden"
                                                                    id="id_pengiriman"
                                                                    name="id_pengiriman"
                                                                    value={
                                                                        formInputs.id_pengiriman
                                                                    }
                                                                    onChange={
                                                                        handleChangePesanan
                                                                    }
                                                                />
                                                                <input
                                                                    type="hidden"
                                                                    value={
                                                                        formInputs.kd_barang
                                                                    }
                                                                    name="kd_barang"
                                                                    onChange={(
                                                                        form
                                                                    ) =>
                                                                        handleChangePesanan(
                                                                            form,
                                                                            index
                                                                        )
                                                                    }
                                                                />
                                                            </td>
                                                            <td>
                                                                {
                                                                    formInputs.nama_barang
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    formInputs.kategori
                                                                }
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    class="form-control"
                                                                    name="jumlah"
                                                                    onChange={(
                                                                        form
                                                                    ) =>
                                                                        handleChangePesanan(
                                                                            form,
                                                                            index
                                                                        )
                                                                    }
                                                                />
                                                            </td>
                                                            <td>
                                                                <button
                                                                    class="btn btn-danger"
                                                                    onClick={() =>
                                                                        handleDeleteForm(
                                                                            index
                                                                        )
                                                                    }
                                                                >
                                                                    <i className="fas fa-trash"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                            )}
                                        </tbody>
                                    </table>

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

            {/* Barang Live Modal */}
            <div
                className="modal fade"
                id="barangModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Pilih Barang
                            </h5>
                            <button
                                className="close"
                                type="button"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body text-center">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Kode Barang</th>
                                        <th>Nama Barang</th>
                                        <th>Kategori</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {barang.map((item) => (
                                        <tr>
                                            <td>{item.kd_barang}</td>
                                            <td>{item.nama_barang}</td>
                                            <td>
                                                {kategori.map((kategori) => {
                                                    return kategori.id ==
                                                        item.id_kategori
                                                        ? kategori.kategori
                                                        : "";
                                                })}
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-primary"
                                                    onClick={() =>
                                                        handleBarang(
                                                            item.kd_barang
                                                        )
                                                    }
                                                >
                                                    Pilih
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* <div className="modal-footer">
                            <button
                                className="btn btn-secondary"
                                type="button"
                                data-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreatePengiriman;
