import React, { useState, useEffect } from "react";
import { Link, Head, usePage, router } from "@inertiajs/react";
import Template from "@/Layout/Template";
import DataTable from "react-data-table-component";
import BeatLoader from "react-spinners/BeatLoader";

const Kategori = () => {
    const { pengiriman } = usePage().props;
    const { kurir } = usePage().props;
    const { customer } = usePage().props;
    const { barang } = usePage().props;
    const { pesanan } = usePage().props;

    const [pendding, setPendding] = useState(true);

    const [rows, setRows] = useState([]);

    const handleFilter = (e) => {
        const datas = kategori.filter((item) => {
            return item.kategori
                .toLowerCase()
                .includes(e.target.value.toLowerCase());
        });
        setRows(datas);
    };

    useEffect(() => {
        fetchData();
    }, [pendding]);

    const fetchData = () => {
        const timeOut = setTimeout(() => {
            setRows(pengiriman);
            setPendding(false);
        }, 1500);
        return () => clearTimeout(timeOut);
    };

    const columns = [
        {
            name: "ID Pengiriman",
            selector: (row) => row.id_pengiriman,
            sortable: true,
        },
        {
            name: "Tanggal",
            selector: (row) => row.tanggal,
            sortable: true,
        },
        {
            name: "Customer",
            selector: (row) => {
                return customer
                    .filter((item) => {
                        return item.id == row.id_customer;
                    })
                    .map((customer) => {
                        return customer.name;
                    });
            },
            sortable: true,
        },
        {
            name: "Kurir",
            selector: (row) => {
                return kurir
                    .filter((item) => {
                        return item.id_kurir == row.id_kurir;
                    })
                    .map((kurir) => {
                        return kurir.name;
                    });
            },
            sortable: true,
        },
        {
            name: "Status",
            selector: (row) => (
                <button
                    className={
                        row.status == "Diterima"
                            ? "btn btn-success btn-sm"
                            : "btn btn-secondary btn-sm"
                    }
                >
                    {row.status}
                </button>
            ),
        },
        {
            name: "Status",
            selector: (row) => row.penerima,
            sortable: true,
        },
        {
            name: "Aksi",
            selector: (row) => (
                <div>
                    {/* Live Modal Pesanan */}
                    <a
                        href=""
                        data-toggle="modal"
                        data-target={`#pengirimanModal${row.id_pengiriman}`}
                        className="btn btn-primary btn-sm"
                    >
                        <i className="fas fa-clipboard-list"></i>
                    </a>

                    <Link
                        href={`/pengiriman/${row.id_pengiriman}/edit`}
                        className="btn btn-warning btn-sm mr-2 ml-2"
                    >
                        <i className="fas fa-check-circle"></i>
                    </Link>

                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => confirmDelete(row.id_pengiriman)}
                    >
                        <i className="fas fa-trash"></i>
                    </button>
                </div>
            ),
        },
    ];

    const confirmDelete = (id_pengiriman) => {
        Swal.fire({
            title: "Ingin hapus?",
            text: "Data yang dihapus, tidak bisa kembali",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/pengiriman/${id_pengiriman}`);
                Swal.fire({
                    title: "Hapus!",
                    text: "Data berhasil hapus",
                    icon: "success",
                });

                const timeOut = setTimeout(() => {
                    setPendding(true);
                    // setRows(user);
                    fetchData();
                }, 1000);

                return () => clearTimeout(timeOut);
            }
        });
    };

    // Custom style table
    const styleTable = {
        headCells: {
            style: {
                fontSize: 14,
                fontWeight: 600,
            },
        },
    };

    return (
        <>
            <Template>
                <Head title="InventoriApp - Kategori" />
                {/* Page Heading  */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Kategori</h1>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card mt-3">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h6 className="fw-bold font-weight-bold text-primary">
                                    Data Kategori
                                </h6>
                                <Link
                                    href="/pengiriman/create"
                                    className="btn btn-primary btn-sm"
                                >
                                    <i className="fas fa-plus mr-2"></i>Tambah
                                </Link>
                            </div>
                            <div className="card-body">
                                <DataTable
                                    columns={columns}
                                    data={rows}
                                    customStyles={styleTable}
                                    progressPending={pendding}
                                    progressComponent={
                                        <BeatLoader
                                            color={"#596EEE"}
                                            size={10}
                                            aria-label="Loading"
                                        />
                                    }
                                    pagination
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Template>

            {/* Daftar Pesanan */}
            {pengiriman.map((item) => (
                <div
                    className="modal fade"
                    id={`pengirimanModal${item.id_pengiriman}`}
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5
                                    className="modal-title"
                                    id="exampleModalLabel"
                                >
                                    Daftar Pesanan
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
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-10">
                                        <table class="table">
                                            <tbody>
                                                <tr
                                                    style={{
                                                        border: "none",
                                                    }}
                                                >
                                                    <th
                                                        style={{
                                                            border: "none",
                                                            width: 180,
                                                        }}
                                                    >
                                                        Kode Pengiriman
                                                    </th>
                                                    <th
                                                        align="left"
                                                        style={{
                                                            border: "none",
                                                        }}
                                                    >
                                                        : {item.id_pengiriman}
                                                    </th>

                                                    <th>ID Kurir</th>
                                                    <th>: {item.id_kurir}</th>
                                                </tr>
                                                <tr>
                                                    <th
                                                        style={{
                                                            border: "none",
                                                            width: 160,
                                                        }}
                                                    >
                                                        Customer
                                                    </th>
                                                    <th
                                                        align="left"
                                                        style={{
                                                            border: "none",
                                                        }}
                                                    >
                                                        :{" "}
                                                        {customer
                                                            .filter(
                                                                (customer) => {
                                                                    return (
                                                                        customer.id ==
                                                                        item.id_customer
                                                                    );
                                                                }
                                                            )
                                                            .map((item) => {
                                                                return item.name;
                                                            })}
                                                    </th>

                                                    <th
                                                        style={{
                                                            border: "none",
                                                        }}
                                                    >
                                                        Kurir
                                                    </th>
                                                    <th
                                                        style={{
                                                            border: "none",
                                                        }}
                                                    >
                                                        :{" "}
                                                        {kurir
                                                            .filter((kurir) => {
                                                                return (
                                                                    kurir.id_kurir ==
                                                                    item.id_kurir
                                                                );
                                                            })
                                                            .map((kurir) => {
                                                                return kurir.name;
                                                            })}
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th
                                                        style={{
                                                            border: "none",
                                                            width: 160,
                                                        }}
                                                    >
                                                        Nomor Telepon
                                                    </th>
                                                    <th
                                                        align="left"
                                                        style={{
                                                            border: "none",
                                                        }}
                                                    >
                                                        :{" "}
                                                        {customer
                                                            .filter(
                                                                (customer) => {
                                                                    return (
                                                                        customer.id ==
                                                                        item.id_customer
                                                                    );
                                                                }
                                                            )
                                                            .map((item) => {
                                                                return item.nomor_telepon;
                                                            })}
                                                    </th>
                                                    <th
                                                        style={{
                                                            border: "none",
                                                        }}
                                                    >
                                                        Kode Pos
                                                    </th>
                                                    <th
                                                        style={{
                                                            border: "none",
                                                        }}
                                                    >
                                                        : {item.nomor_pos}
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th
                                                        style={{
                                                            border: "none",
                                                            width: 160,
                                                        }}
                                                    >
                                                        Alamat
                                                    </th>
                                                    <th
                                                        align="left"
                                                        style={{
                                                            border: "none",
                                                        }}
                                                    >
                                                        :{" "}
                                                        {customer
                                                            .filter(
                                                                (customer) => {
                                                                    return (
                                                                        customer.id ==
                                                                        item.id_customer
                                                                    );
                                                                }
                                                            )
                                                            .map((item) => {
                                                                return item.alamat;
                                                            })}
                                                    </th>

                                                    <th
                                                        style={{
                                                            border: "none",
                                                        }}
                                                    >
                                                        Status
                                                    </th>
                                                    <th
                                                        style={{
                                                            border: "none",
                                                        }}
                                                    >
                                                        : {item.status}
                                                    </th>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="col-12 mt-1">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th>Kode Barang</th>
                                                    <th>Nama Barang</th>
                                                    <th>Jumlah</th>
                                                    <th>Harga</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {pesanan
                                                    .filter((pesanan) => {
                                                        return (
                                                            pesanan.id_pengiriman ==
                                                            item.id_pengiriman
                                                        );
                                                    })
                                                    .map((pesanan) => {
                                                        return (
                                                            <tr>
                                                                <td>
                                                                    {
                                                                        pesanan.kd_barang
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {barang
                                                                        .filter(
                                                                            (
                                                                                barang
                                                                            ) => {
                                                                                return (
                                                                                    barang.kd_barang ==
                                                                                    pesanan.kd_barang
                                                                                );
                                                                            }
                                                                        )
                                                                        .map(
                                                                            (
                                                                                barangPesanan
                                                                            ) => {
                                                                                return barangPesanan.nama_barang;
                                                                            }
                                                                        )}
                                                                </td>
                                                                <td>
                                                                    {
                                                                        pesanan.jumlah
                                                                    }
                                                                </td>
                                                                <td>
                                                                    Rp.{" "}
                                                                    {barang
                                                                        .filter(
                                                                            (
                                                                                barang
                                                                            ) => {
                                                                                return (
                                                                                    barang.kd_barang ==
                                                                                    pesanan.kd_barang
                                                                                );
                                                                            }
                                                                        )
                                                                        .map(
                                                                            (
                                                                                barangPesanan
                                                                            ) => {
                                                                                return barangPesanan.harga;
                                                                            }
                                                                        )}
                                                                </td>
                                                                <td>
                                                                    Rp.{" "}
                                                                    {barang
                                                                        .filter(
                                                                            (
                                                                                barang
                                                                            ) => {
                                                                                return (
                                                                                    barang.kd_barang ==
                                                                                    pesanan.kd_barang
                                                                                );
                                                                            }
                                                                        )
                                                                        .map(
                                                                            (
                                                                                barangPesanan
                                                                            ) => {
                                                                                return (
                                                                                    barangPesanan.harga *
                                                                                    pesanan.jumlah
                                                                                );
                                                                            }
                                                                        )}
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Kategori;
