import React, { useState, useEffect } from "react";
import { Link, Head, usePage, router } from "@inertiajs/react";
import Template from "@/Layout/Template";
import DataTable from "react-data-table-component";
import BeatLoader from "react-spinners/BeatLoader";

const Kategori = () => {
    const { pengiriman } = usePage().props;
    const { kurir } = usePage().props;
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
            name: "Pelanggan",
            selector: (row) => row.pelanggan,
            sortable: true,
        },
        {
            name: "Kurir",
            selector: (row) => {
                return kurir.map((item) => {
                    return (item.id_kurir = item.id_kurir ? item.name : "");
                });
            },
            sortable: true,
        },
        {
            name: "Status",
            selector: (row) => {
                <button
                    className={
                        row.status == "Diterima"
                            ? "btn btn-success btn-sm"
                            : "btn btn-success btn-sm"
                    }
                >
                    {row.status}
                </button>;
            },
        },
        {
            name: "Aksi",
            selector: (row) => (
                <>
                    {/* Live Modal Pesanan */}
                    <a href="" className="btn btn-primary btn-sm">
                        <i className="fas fa-clipboard-ist"></i>
                    </a>

                    <Link href="" className="btn btn-warning btn-sm">
                        <i className="fas fa-edit"></i>
                    </Link>

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

    const confirmDelete = (id) => {
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
                router.delete(`/kategori/${id}`);
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
    );
};

export default Kategori;
