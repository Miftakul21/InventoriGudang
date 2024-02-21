import React, { useState, useEffect, useRef } from "react";
import { Link, Head, usePage, router } from "@inertiajs/react";
import Template from "@/Layout/Template";
import DataTable from "react-data-table-component";
import BeatLoader from "react-spinners/BeatLoader";

const Barang = () => {
    const { barang } = usePage().props;
    const { kategori } = usePage().props;
    const [pendding, setPendding] = useState(true);
    const [rows, setRows] = useState([]);
    const { auth } = usePage().props;

    const handleFilter = (e) => {
        const datas = barang.filter((item) => {
            return (
                item.kd_barang
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase()) ||
                item.nama_barang
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
            );
        });
        setRows(datas);
    };

    useEffect(() => {
        fetchData();
    }, [pendding]);

    const fetchData = () => {
        const timeOut = setTimeout(() => {
            setRows(barang);
            setPendding(false);
        }, 1500);
        return () => clearTimeout(timeOut);
    };

    const columnsAdmin = [
        {
            name: "Kode Barang",
            selector: (row) => row.kd_barang,
            sortable: true,
        },
        {
            name: "Nama Barang",
            selector: (row) => row.nama_barang,
            sortable: true,
        },
        {
            name: "Image",
            selector: (row) => (
                <div style={{ width: 80, height: 80 }}>
                    <img
                        src={`../../../foto_barang/${row.image}`}
                        alt="foto_image"
                        style={{ width: "100%", height: "100%" }}
                    />
                </div>
            ),
            sortable: true,
        },
        {
            name: "Kategori",
            selector: (row) => {
                return kategori.map((kategori) => {
                    return kategori.id == row.id_kategori
                        ? kategori.kategori
                        : "";
                });
            },
            sortable: true,
        },
        {
            name: "Stok",
            selector: (row) => (
                <button
                    className={
                        row.quantity <= row.stok_minimum
                            ? "btn btn-danger btn-sm"
                            : "btn btn-primary btn-sm"
                    }
                >
                    {row.quantity}
                </button>
            ),
            sortable: true,
        },
        {
            name: "Stok Minimum",
            selector: (row) => (
                <button className="btn btn-warning btn-sm ">
                    {row.stok_minimum}
                </button>
            ),
            sortable: true,
        },
        {
            name: "Harga",
            selector: (row) => "Rp. " + row.harga,
            sortable: true,
        },
        {
            name: "Aksi",
            selector: (row) => (
                <>
                    <Link
                        href={`/barang/${row.kd_barang}/edit`}
                        className="btn btn-warning btn-sm mr-2"
                    >
                        <i className="fas fa-edit"></i>
                    </Link>

                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => confirmDelete(row.kd_barang)}
                    >
                        <i className="fas fa-trash"></i>
                    </button>
                </>
            ),
        },
    ];

    const columnsStaff = [
        {
            name: "Kode Barang",
            selector: (row) => row.kd_barang,
            sortable: true,
        },
        {
            name: "Nama Barang",
            selector: (row) => row.nama_barang,
            sortable: true,
        },
        {
            name: "Image",
            selector: (row) => (
                <div style={{ width: 80, height: 80 }}>
                    <img
                        src={`../../../foto_barang/${row.image}`}
                        alt="foto_image"
                        style={{ width: "100%", height: "100%" }}
                    />
                </div>
            ),
            sortable: true,
        },
        {
            name: "Kategori",
            selector: (row) => {
                return kategori.map((kategori) => {
                    return kategori.id == row.id_kategori
                        ? kategori.kategori
                        : "";
                });
            },
            sortable: true,
        },
        {
            name: "Stok",
            selector: (row) => (
                <button
                    className={
                        row.quantity <= row.stok_minimum
                            ? "btn btn-danger btn-sm"
                            : "btn btn-primary btn-sm"
                    }
                >
                    {row.quantity}
                </button>
            ),
            sortable: true,
        },
        {
            name: "Stok Minimum",
            selector: (row) => (
                <button className="btn btn-warning btn-sm ">
                    {row.stok_minimum}
                </button>
            ),
            sortable: true,
        },
        {
            name: "Harga",
            selector: (row) => "Rp. " + row.harga,
            sortable: true,
        },
    ];

    const columnsRole = auth.user.role != "staff" ? columnsAdmin : columnsStaff;

    const confirmDelete = (kd_barang) => {
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
                router.delete(`/barang/${kd_barang}`);
                Swal.fire({
                    title: "Hapus!",
                    text: "Data berhasil hapus",
                    icon: "success",
                });
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
        <Template>
            <Head title="InventoriApp - Barang" />
            {/* Page Heading  */}
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Barang</h1>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card mt-3">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h6 className="fw-bold font-weight-bold text-primary">
                                Data Barang
                            </h6>
                            <Link
                                href="/barang/create"
                                className={
                                    auth.user.role != "staff"
                                        ? "btn btn-primary btn-sm"
                                        : "d-none"
                                }
                            >
                                <i className="fas fa-plus mr-2"></i>Tambah
                            </Link>
                        </div>
                        <div className="card-body">
                            <div className="row justify-content-end">
                                <div className="col-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="search..."
                                        onChange={handleFilter}
                                    />
                                </div>
                            </div>
                            <DataTable
                                columns={columnsRole}
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
    );
};

export default Barang;
