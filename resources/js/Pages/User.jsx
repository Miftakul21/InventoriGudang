import React, { useState, useEffect } from "react";
import { Link, Head, usePage, router } from "@inertiajs/react";
import Template from "@/Layout/Template";
import DataTable from "react-data-table-component";
import BeatLoader from "react-spinners/BeatLoader";

const User = () => {
    const { user } = usePage().props;
    const [pendding, setPendding] = useState(true);
    const [rows, setRows] = useState([]);

    const handleFilter = (e) => {
        const datas = user.filter((item) => {
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
            setRows(user);
            setPendding(false);
        }, 1500);
        return () => clearTimeout(timeOut);
    };

    const columns = [
        {
            name: "Nama",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true,
        },
        {
            name: "Nomor Telepon",
            selector: (row) => row.nomor_telepon,
            sortable: true,
        },
        {
            name: "Role",
            selector: (row) => row.role[0].toUpperCase() + row.role.slice(1),
            sortable: true,
        },
        {
            name: "Aksi",
            selector: (row) => (
                <>
                    <Link
                        href={`/user/${row.id}/edit`}
                        className="btn btn-warning btn-sm mr-2"
                    >
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
                router.delete(`/user/${id}`, {});
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
            <Head title="InventoriApp - User" />
            {/* Page Heading  */}
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">User</h1>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card mt-3">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h6 className="fw-bold font-weight-bold text-primary">
                                Data User
                            </h6>
                            <Link
                                href="/user/create"
                                className="btn btn-primary btn-sm"
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

export default User;
