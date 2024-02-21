import React, { useEffect, useState } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import Template from "@/Layout/Template";
import DataTable from "react-data-table-component";
import BeatLoader from "react-spinners/BeatLoader";

const Kurir = () => {
    const { kurir } = usePage().props;
    const [pendding, setPendding] = useState(true);
    const [rows, setRows] = useState([]);

    const handleFilter = (e) => {
        const datas = kurir.filter((item) => {
            return (
                item.name
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase()) ||
                item.role.toLowerCase().includes(e.target.value.toLowerCase())
            );
        });
        setRows(datas);
    };

    useEffect(() => {
        fetchData();
    }, [pendding]);

    const fetchData = () => {
        const timeOut = setTimeout(() => {
            setRows(kurir);
            setPendding(false);
        }, 1500);
        return () => clearTimeout(timeOut);
    };

    const columns = [
        {
            name: "Id Kurir",
            selector: (row) => row.id_kurir,
            sortable: true,
        },
        {
            name: "Nama",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Nomor Telepon",
            selector: (row) => row.nomor_telepon,
            sortable: true,
        },
        {
            name: "Alamat",
            selector: (row) => row.alamat,
            sortable: true,
        },
        {
            name: "Aksi",
            selector: (row) => (
                <>
                    <Link
                        href={`/kurir/${row.id_kurir}/edit`}
                        className="btn btn-warning btn-sm mr-2"
                    >
                        <i className="fas fa-edit"></i>
                    </Link>

                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => confirmDelete(row.id_kurir)}
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
                router.delete(`/kurir/${id}`);
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
            <Head title="InventoriApp - Kurir" />
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Kurir</h1>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card mt-3">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h6 className="fw-bold font-weight-bold text-primary">
                                Data Kurir
                            </h6>
                            <Link
                                href="/kurir/create"
                                className="btn btn-primary btn-sm"
                            >
                                <i className="fas fa-plus mr-2"></i>Tambah
                            </Link>
                        </div>
                        <div className="card-body">
                            <DataTable
                                columns={columns}
                                data={kurir}
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

export default Kurir;
