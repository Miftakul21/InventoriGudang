import React, { useState } from "react";
import { Link, Head, usePage, router } from "@inertiajs/react";
import TemplateLogin from "@/Layout/TemplateLogin";
import Inventori from "@/Assets/Image/Inventori.jpg";

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const { errors } = usePage().props;

    const [type, setType] = useState("password");

    const handleLogin = (e) => {
        e.preventDefault();
        router.post("/auth", {
            email: email,
            password: password,
        });
    };

    const showPassowrd = () => {
        return type === "password" ? setType("text") : setType("password");
    };

    return (
        <TemplateLogin>
            <Head title="InventoriApp - Login" />
            <div className="col-xl-10 col-lg-12 col-md-9">
                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        {/* <!-- Nested Row within Card Body --> */}
                        <div className="row" style={{ height: 500 }}>
                            <div className="col-lg-6 align-self-center">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className=" text-gray-900 mb-4 fw-bold">
                                            LOGIN
                                        </h1>
                                    </div>
                                    <form
                                        className="user"
                                        onSubmit={handleLogin}
                                    >
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className={
                                                    errors.email
                                                        ? "form-control form-control-user is-invalid"
                                                        : "form-control form-control-user"
                                                }
                                                id="email"
                                                placeholder="Masukkan email"
                                                style={style.input}
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
                                        <div
                                            className="form-group"
                                            style={style.containerPassword}
                                        >
                                            <input
                                                type={type}
                                                className={
                                                    errors.password
                                                        ? "form-control form-control-user is-invalid"
                                                        : "form-control form-control-user"
                                                }
                                                id="password"
                                                placeholder="Masukkan password"
                                                style={style.input}
                                                value={password}
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                            />
                                            <span
                                                onClick={showPassowrd}
                                                style={style.buttonShow}
                                            >
                                                <i
                                                    className={
                                                        type == "password"
                                                            ? "fas fa-eye-slash"
                                                            : "fas fa-eye"
                                                    }
                                                ></i>
                                            </span>

                                            {errors.password && (
                                                <div className="invalid-feedback">
                                                    {errors.password}
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            style={style.button}
                                        >
                                            Login
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <div
                                className="col-lg-6 d-none d-lg-block"
                                style={style.containerImage}
                            >
                                <img
                                    src={Inventori}
                                    alt="image-inventori"
                                    style={style.image}
                                />
                                <div style={style.linerGradient}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </TemplateLogin>
    );
};

const style = {
    input: {
        borderRadius: 10,
        fontSize: 14,
    },
    button: {
        borderRadius: 10,
        width: 80,
        padding: 8,
        fontSize: 16,
        fontWeight: "bold",
    },
    containerImage: {
        position: "relative",
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
        backgroundSize: "center",
    },
    linerGradient: {
        position: "absolute",
        top: 0,
        left: 12,
        width: "100%",
        height: "100%",
        backgroundColor: "#000",
        opacity: 0.5,
    },
    containerPassword: {
        position: "relative",
    },
    buttonShow: {
        position: "absolute",
        right: 20,
        top: 12,
        fontSize: 20,
    },
};

export default Login;
