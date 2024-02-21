import React, { useState, useEffect } from "react";
import { Link, Head, usePage, router } from "@inertiajs/react";
import Template from "@/Layout/Template";
import DataTable from "react-data-table-component";
import BeatLoader from "react-spinners/BeatLoader";

const BarangMasuk = () => {
    const { barangMasuk } = usePage().props;
    const { barang } = usePage().props;
    const [pendding, setPendding] = useState(true);
    const { auth } = usePage().props;

    const [rows, setRows] = useState([]);

    const handleFilter = (e) => {
        const datas = barangMasuk.filter((item) => {
            return item.kd_barang
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
            setRows(barangMasuk);
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
            name: "Barang",
            selector: (row) => {
                return barang.map((barang) => {
                    return barang.kd_barang == row.kd_barang
                        ? barang.nama_barang
                        : "";
                });
            },
            sortable: true,
        },
        {
            name: "Image",
            selector: (row) => {
                return barang.map((item) => {
                    return item.kd_barang == row.kd_barang ? (
                        <div style={{ width: 80, height: 80 }}>
                            <img
                                src={`../../../foto_barang/${item.image}`}
                                alt="foto_image"
                                style={{ width: "100%", height: "100%" }}
                            />
                        </div>
                    ) : (
                        ""
                    );
                });
            },
            sortable: true,
        },
        {
            name: "Stok Awal",
            selector: (row) => (
                <button className="btn btn-secondary btn-sm">
                    {row.stok_awal}
                </button>
            ),
            sortable: true,
        },
        {
            name: "Stok Masuk",
            selector: (row) => (
                <button className="btn btn-success btn-sm">
                    {row.stok_masuk}
                </button>
            ),
            sortable: true,
        },
        {
            name: "Total",
            selector: (row) => (
                <button className="btn btn-primary btn-sm">
                    {row.stok_awal + row.stok_masuk}
                </button>
            ),
            sortable: true,
        },
        {
            name: "Tanggal",
            selector: (row) => row.tanggal.split(" ").join(""),
            sortable: true,
        },
        {
            name: "Deskripsi",
            selector: (row) => row.deskripsi,
            sortable: true,
        },
        {
            name: "Aksi",
            selector: (row) => (
                <>
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => confirmDelete(row.id)}
                    >
                        <i className="fas fa-trash"></i>
                    </button>
                </>
            ),
        },
    ];

    const columnsSales = [
        {
            name: "Kode Barang",
            selector: (row) => row.kd_barang,
            sortable: true,
        },
        {
            name: "Barang",
            selector: (row) => {
                return barang.map((barang) => {
                    return barang.kd_barang == row.kd_barang
                        ? barang.nama_barang
                        : "";
                });
            },
            sortable: true,
        },
        {
            name: "Image",
            selector: (row) => {
                return barang.map((item) => {
                    return item.kd_barang == row.kd_barang ? (
                        <div style={{ width: 80, height: 80 }}>
                            <img
                                src={`../../../foto_barang/${item.image}`}
                                alt="foto_image"
                                style={{ width: "100%", height: "100%" }}
                            />
                        </div>
                    ) : (
                        ""
                    );
                });
            },
            sortable: true,
        },
        {
            name: "Stok Awal",
            selector: (row) => (
                <button className="btn btn-secondary btn-sm">
                    {row.stok_awal}
                </button>
            ),
            sortable: true,
        },
        {
            name: "Stok Masuk",
            selector: (row) => (
                <button className="btn btn-success btn-sm">
                    {row.stok_masuk}
                </button>
            ),
            sortable: true,
        },
        {
            name: "Total",
            selector: (row) => (
                <button className="btn btn-primary btn-sm">
                    {row.stok_awal + row.stok_masuk}
                </button>
            ),
            sortable: true,
        },
        {
            name: "Tanggal",
            selector: (row) => row.tanggal.split(" ").join(""),
            sortable: true,
        },
        {
            name: "Deskripsi",
            selector: (row) => row.deskripsi,
            sortable: true,
        },
    ];

    const columnsRole = auth.user.role != "staff" ? columnsAdmin : columnsSales;

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
                router.delete(`/barang-masuk/${kd_barang}`);
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
        <Template>
            <Head title="InventoriApp - Barang Masuk" />
            {/* Page Heading  */}
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Barang Masuk</h1>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card mt-3">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h6 className="fw-bold font-weight-bold text-primary">
                                Data Barang Masuk
                            </h6>
                            <Link
                                href="/barang-masuk/create"
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

export default BarangMasuk;
