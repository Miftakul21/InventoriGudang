import React, { useState } from "react";
import { Head, usePage, router, Link } from "@inertiajs/react";
import Template from "@/Layout/Template";
import { filter, values } from "lodash";

const StatusPengiriman = () => {
    const { errors } = usePage().props;
    const { kd_barang } = usePage().props;
    const { customer } = usePage().props;
    const { kurir } = usePage().props;
    const { kategori } = usePage().props;
    const { barang } = usePage().props;
    const { pengiriman } = usePage().props;
    const { pesanan } = usePage().props;

    const [valuesPengiriman, setValuesPengiriman] = useState({
        id_pengiriman: pengiriman[0].id_pengiriman,
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

    // Map data customer
    const customers = customer
        .filter((customer) => {
            return customer.id == pengiriman[0].id_customer;
        })
        .map((dataCustomer) => {
            return dataCustomer.name;
        });

    // Pilihan penerima select
    const selectPenerima = () => {
        Swal.fire({
            title: "Konfirmasi Pengiriman",
            text: "Pengiriman sudah sampai",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sudah diterima",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(
                    `/pengiriman-status`,
                    {
                        id_pengiriman: pengiriman[0].id_pengiriman,
                        penerima: customers[0],
                    },
                    {
                        onSuccess: () => {
                            Swal.fire({
                                title: "Success!",
                                text: "Pengiriman selesai",
                                icon: "success",
                            });
                        },
                    }
                );
            }
        });
    };

    // Pilihan penerima text input
    const textInput = async () => {
        const { value: text } = await Swal.fire({
            input: "textarea",
            inputLabel: "Penerima",
            inputPlaceholder: "Masukkan penerima barang...",
            inputAttributes: {
                "aria-label": "Type your message here",
            },
            showCancelButton: true,
        });

        if (text) {
            Swal.fire({
                title: "Konfirmasi Pengiriman",
                text: "Pengiriman sudah sampai",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sudah diterima",
                cancelButtonText: "Batal",
            }).then((result) => {
                if (result.isConfirmed) {
                    router.post(
                        `/pengiriman-status`,
                        {
                            id_pengiriman: pengiriman[0].id_pengiriman,
                            penerima: text,
                        },
                        {
                            onSuccess: () => {
                                console.log("berhasil selesai");
                            },
                        }
                    );
                    Swal.fire({
                        title: "Success!",
                        text: "Pengiriman selesai",
                        icon: "success",
                    });
                }
            });
        }
    };

    const handleConfirmasi = async () => {
        const { value: penerima } = await Swal.fire({
            title: "Pilih penerima",
            input: "select",
            inputOptions: {
                penerima: customers[0],
                other: "Lainnya",
            },
            inputPlaceholder: "Pilih penerima",
            showCancelButton: true,
            inputValidator: (value) => {
                return new Promise((resolve) => {
                    if (value === "penerima") {
                        resolve();
                    } else {
                        textInput();
                    }
                });
            },
        });

        if (penerima) {
            selectPenerima();
        }
    };

    return (
        <>
            <Template>
                <Head title="InventoriApp - Create Customer" />
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header font-weight-bold text-primary">
                                Pengiriman No. {pengiriman[0].id_pengiriman}
                            </div>
                            <div className="card-body">
                                <div className="form-group">
                                    <table className="table">
                                        <tbody>
                                            {pengiriman.map((item) => (
                                                <>
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
                                                            :{" "}
                                                            {item.id_pengiriman}
                                                        </th>

                                                        <th>ID Kurir</th>
                                                        <th>
                                                            : {item.id_kurir}
                                                        </th>
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
                                                                    (
                                                                        customer
                                                                    ) => {
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
                                                                .filter(
                                                                    (kurir) => {
                                                                        return (
                                                                            kurir.id_kurir ==
                                                                            item.id_kurir
                                                                        );
                                                                    }
                                                                )
                                                                .map(
                                                                    (kurir) => {
                                                                        return kurir.name;
                                                                    }
                                                                )}
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
                                                                    (
                                                                        customer
                                                                    ) => {
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
                                                                    (
                                                                        customer
                                                                    ) => {
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
                                                </>
                                            ))}
                                        </tbody>
                                    </table>
                                    <button
                                        className="btn btn-primary mr-2"
                                        onClick={handleConfirmasi}
                                    >
                                        Selesai Pengiriman
                                    </button>
                                    <Link
                                        href="/pengiriman"
                                        className="btn btn-secondary"
                                    >
                                        Kembali
                                    </Link>
                                </div>
                                <hr className="sidebar-divider my-2" />

                                <table className="table mt-3 mb-3">
                                    <thead>
                                        <tr>
                                            <th>Kode Barang</th>
                                            <th>Nama Barang</th>
                                            <th style={{ width: 200 }}>
                                                Jumlah
                                            </th>
                                            <th>Harga</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pesanan
                                            .filter((pesanan) => {
                                                return (
                                                    pesanan.id_pengiriman ==
                                                    pengiriman[0].id_pengiriman
                                                );
                                            })
                                            .map((item) => {
                                                return (
                                                    <tr>
                                                        <td>
                                                            {item.kd_barang}
                                                        </td>
                                                        <td>
                                                            {barang
                                                                .filter(
                                                                    (
                                                                        barang
                                                                    ) => {
                                                                        return (
                                                                            barang.kd_barang ==
                                                                            item.kd_barang
                                                                        );
                                                                    }
                                                                )
                                                                .map(
                                                                    (datas) => {
                                                                        return datas.nama_barang;
                                                                    }
                                                                )}
                                                        </td>
                                                        <td>{item.jumlah}</td>
                                                        <td>
                                                            Rp.{" "}
                                                            {barang
                                                                .filter(
                                                                    (
                                                                        barang
                                                                    ) => {
                                                                        return (
                                                                            barang.kd_barang ==
                                                                            item.kd_barang
                                                                        );
                                                                    }
                                                                )
                                                                .map(
                                                                    (datas) => {
                                                                        return datas.harga;
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
                                                                            item.kd_barang
                                                                        );
                                                                    }
                                                                )
                                                                .map(
                                                                    (datas) => {
                                                                        return (
                                                                            datas.harga *
                                                                            item.jumlah
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
            </Template>
        </>
    );
};

export default StatusPengiriman;
