import React, { useState } from "react";
import { Head, usePage, router, Link } from "@inertiajs/react";
import Template from "@/Layout/Template";

const EditUser = () => {
    const { user } = usePage().props;
    const { errors } = usePage().props;

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [nomorTelepon, setNomorTelepon] = useState(user.nomor_telepon);
    const [password, setPassword] = useState();
    const [role, setRole] = useState(user.role);

    const handleUpdate = (e) => {
        e.preventDefault();
        router.put(
            `/user/${user.id}`,
            {
                name: name,
                email: email,
                nomor_telepon: nomorTelepon,
                password: password,
                role: role,
            },
            {
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
            }
        );
    };

    return (
        <Template>
            <Head title="InventoriApp - Edit User" />
            <div className="row">
                <div className="col-7">
                    <div className="card">
                        <div className="card-header font-weight-bold text-primary">
                            Form
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleUpdate}>
                                <div className="form-group">
                                    <label
                                        htmlFor="name"
                                        className="form-label font-weight-bold"
                                    >
                                        Nama
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className={
                                            errors.name
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        placeholder="Masukkan nama"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                    {errors.name && (
                                        <div className="invalid-feedback">
                                            {errors.name}
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="email"
                                        className="form-label font-weight-bold"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="text"
                                        id="email"
                                        className={
                                            errors.email
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        placeholder="Masukkan email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                    {errors.email && (
                                        <div className="invalid-feedback">
                                            {errors.email}
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="nomorTelepon"
                                        className="form-label font-weight-bold"
                                    >
                                        Nomor Telepon
                                    </label>
                                    <input
                                        type="text"
                                        id="nomorTelepon"
                                        className={
                                            errors.nomor_telepon
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        placeholder="Masukkan nomor telepon"
                                        value={nomorTelepon}
                                        onChange={(e) =>
                                            setNomorTelepon(e.target.value)
                                        }
                                    />
                                    {errors.nomor_telepon && (
                                        <div className="invalid-feedback">
                                            {errors.nomor_telepon}
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="password"
                                        className="form-label font-weight-bold"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        className={
                                            errors.password
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        placeholder="Masukkan password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                    {errors.password && (
                                        <div className="invalid-feedback">
                                            {errors.password}
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="role"
                                        className="form-label font-weight-bold"
                                    >
                                        Role
                                    </label>
                                    <select
                                        id="role"
                                        className={
                                            errors.role
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        defaultValue={user.role}
                                        onChange={(e) =>
                                            setRole(e.target.value)
                                        }
                                    >
                                        <option value={""}>Role</option>
                                        <option value="admin">Admin</option>
                                        <option value="staff">Staff</option>
                                    </select>
                                    {errors.role && (
                                        <div className="invalid-feedback">
                                            {errors.role}
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <button
                                        type="submit"
                                        className="btn btn-primary mr-2"
                                    >
                                        Update
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
    );
};

export default EditUser;
