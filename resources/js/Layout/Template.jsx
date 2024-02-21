import React from "react";
import { Head, usePage, Link, router } from "@inertiajs/react";

const Template = ({ children }) => {
    const { url } = usePage();
    const { auth } = usePage().props;
    const { barang } = usePage().props;

    // console.log(barang);

    const handleLogout = () => {
        router.post("/logout");
        $(".modal-backdrop").remove();
        $("body").removeClass("modal-open");
    };

    const buttonSidebar = () => {
        let body = document.body.classList.toggle("sidebar-toggled");
        let sidebar = document
            .querySelector(".sidebar")
            .classList.toggle("toggled");
    };

    const dataBarang = barang.filter((item) => {
        return item.quantity <= item.stok_minimum;
    });

    return (
        <>
            <div id="wrapper">
                {/* Sidebar */}
                <ul
                    className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
                    id="accordionSidebar"
                    style={{
                        borderTopRightRadius: 30,
                        borderBottomRightRadius: 30,
                    }}
                >
                    {/* Sidebar - Brand */}
                    <a
                        className="sidebar-brand d-flex align-items-center justify-content-center"
                        href="/dashboard"
                    >
                        <div className="sidebar-brand-icon ">
                            {/* <i className="fas fa-wifi"></i> */}
                        </div>
                        <div className="sidebar-brand-text mx-1">
                            Inventori App
                        </div>
                    </a>

                    {/* Divider */}
                    <hr className="sidebar-divider my-0" />

                    {/* Heading */}

                    {auth.user.role == "admin" ? (
                        <>
                            <div className="sidebar-heading mt-3">Admin</div>
                            {/* Nav Item - Dashboard  */}
                            <li
                                className={
                                    url === "/dashboard"
                                        ? "nav-item active"
                                        : "nav-item"
                                }
                            >
                                <a className="nav-link" href="/dashboard">
                                    <i className="fas fa-fw fa-tachometer-alt"></i>
                                    <span>Dashboard</span>
                                </a>
                            </li>

                            <li className="nav-item">
                                <a
                                    className="nav-link collapsed"
                                    href="#"
                                    data-toggle="collapse"
                                    data-target="#collapseTwo"
                                    aria-expanded="true"
                                    aria-controls="collapseTwo"
                                >
                                    <i className="fas fa-fw fa-box"></i>
                                    <span>Data Master Barang</span>
                                </a>
                                <div
                                    id="collapseTwo"
                                    className="collapse"
                                    aria-labelledby="headingTwo"
                                    data-parent="#accordionSidebar"
                                >
                                    <div className="bg-white py-2 collapse-inner rounded">
                                        <h6 className="collapse-header">
                                            Daftar data
                                        </h6>
                                        <Link
                                            className="collapse-item"
                                            href="/barang"
                                        >
                                            Barang
                                        </Link>
                                        <Link
                                            className="collapse-item"
                                            href="/kategori"
                                        >
                                            Kategori
                                        </Link>
                                    </div>
                                </div>
                            </li>

                            {/* Nav Item - Charts */}
                            <li
                                className={
                                    url === "/barang-masuk"
                                        ? "nav-item active"
                                        : "nav-item"
                                }
                            >
                                <Link className="nav-link" href="/barang-masuk">
                                    <i className="fas fa-fw fa-boxes"></i>
                                    <span>Barang Masuk</span>
                                </Link>
                            </li>

                            {/* Nav Item - Charts */}
                            <li
                                className={
                                    url === "/barang-keluar"
                                        ? "nav-item active"
                                        : "nav-item"
                                }
                            >
                                <Link
                                    className="nav-link"
                                    href="/barang-keluar"
                                >
                                    <i className="fas fa-fw fa-box-open"></i>
                                    <span>Barang Keluar</span>
                                </Link>
                            </li>

                            {/* Nav Item - Charts */}
                            <li
                                className={
                                    url === "/user"
                                        ? "nav-item active"
                                        : "nav-item"
                                }
                            >
                                <Link className="nav-link" href="/user">
                                    <i className="fas fa-fw fa-user-tag"></i>
                                    <span>User</span>
                                </Link>
                            </li>

                            {/* Nav Item - Charts */}
                            <li
                                className={
                                    url === "/customer"
                                        ? "nav-item active"
                                        : "nav-item"
                                }
                            >
                                <Link className="nav-link" href="/customer">
                                    <i className="fas fa-fw fa-users"></i>
                                    <span>Customer</span>
                                </Link>
                            </li>

                            {/* Nav Item - Charts */}
                            <li
                                className={
                                    url === "/kurir"
                                        ? "nav-item active"
                                        : "nav-item"
                                }
                            >
                                <Link className="nav-link" href="/kurir">
                                    <i className="fas fa-fw fa-truck"></i>
                                    <span>Kurir</span>
                                </Link>
                            </li>

                            {/* Nav Item - Charts */}
                            <li
                                className={
                                    url === "/pengiriman"
                                        ? "nav-item active"
                                        : "nav-item"
                                }
                            >
                                <Link className="nav-link" href="/pengiriman">
                                    <i class="fas fa-fw fa-truck-loading"></i>
                                    <span>Pengiriman</span>
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <div className="sidebar-heading mt-3">Staff</div>
                            {/* Nav Item - Dashboard  */}
                            <li
                                className={
                                    url === "/dashboard"
                                        ? "nav-item active"
                                        : "nav-item"
                                }
                            >
                                <a className="nav-link" href="/dashboard">
                                    <i className="fas fa-fw fa-tachometer-alt"></i>
                                    <span>Dashboard</span>
                                </a>
                            </li>

                            <li className="nav-item">
                                <a
                                    className="nav-link collapsed"
                                    href="#"
                                    data-toggle="collapse"
                                    data-target="#collapseTwo"
                                    aria-expanded="true"
                                    aria-controls="collapseTwo"
                                >
                                    <i className="fas fa-fw fa-box"></i>
                                    <span>Data Master Barang</span>
                                </a>
                                <div
                                    id="collapseTwo"
                                    className="collapse"
                                    aria-labelledby="headingTwo"
                                    data-parent="#accordionSidebar"
                                >
                                    <div className="bg-white py-2 collapse-inner rounded">
                                        <h6 className="collapse-header">
                                            Daftar data
                                        </h6>
                                        <Link
                                            className="collapse-item"
                                            href="/barang"
                                        >
                                            Barang
                                        </Link>
                                        <Link
                                            className="collapse-item"
                                            href="/kategori"
                                        >
                                            Kategori
                                        </Link>
                                    </div>
                                </div>
                            </li>

                            {/* Nav Item - Charts */}
                            <li
                                className={
                                    url === "/barang-masuk"
                                        ? "nav-item active"
                                        : "nav-item"
                                }
                            >
                                <Link className="nav-link" href="/barang-masuk">
                                    <i className="fas fa-fw fa-boxes"></i>
                                    <span>Barang Masuk</span>
                                </Link>
                            </li>

                            {/* Nav Item - Charts */}
                            <li
                                className={
                                    url === "/barang-keluar"
                                        ? "nav-item active"
                                        : "nav-item"
                                }
                            >
                                <Link
                                    className="nav-link"
                                    href="/barang-keluar"
                                >
                                    <i className="fas fa-fw fa-box-open"></i>
                                    <span>Barang Keluar</span>
                                </Link>
                            </li>
                            {/* Nav Item - Charts */}
                            <li
                                className={
                                    url === "/customer"
                                        ? "nav-item active"
                                        : "nav-item"
                                }
                            >
                                <Link className="nav-link" href="/customer">
                                    <i className="fas fa-fw fa-users"></i>
                                    <span>Customer</span>
                                </Link>
                            </li>

                            {/* Nav Item - Charts */}
                            <li
                                className={
                                    url === "/kurir"
                                        ? "nav-item active"
                                        : "nav-item"
                                }
                            >
                                <Link className="nav-link" href="/kurir">
                                    <i className="fas fa-fw fa-truck"></i>
                                    <span>Kurir</span>
                                </Link>
                            </li>

                            {/* Nav Item - Charts */}
                            <li
                                className={
                                    url === "/pengiriman"
                                        ? "nav-item active"
                                        : "nav-item"
                                }
                            >
                                <Link className="nav-link" href="/pengiriman">
                                    <i class="fas fa-fw fa-truck-loading"></i>
                                    <span>Pengiriman</span>
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
                {/* End of Sidebar */}

                {/* Content Wrapper */}
                <div id="content-wrapper" className="d-flex flex-column">
                    {/* Main Content */}
                    <div id="content">
                        {/* Topbar */}
                        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                            {/* Sidebar Toggle (Topbar) */}
                            <button
                                id="sidebarToggleTop"
                                className="btn btn-link d-md-none d-xl-block rounded-circle mr-3"
                                onClick={buttonSidebar}
                            >
                                <i className="fa fa-bars"></i>
                            </button>

                            {/* Topbar Navbar */}
                            <ul className="navbar-nav ml-auto">
                                {/* Nav Item - Search Dropdown (Visible Only XS) */}
                                <li className="nav-item dropdown no-arrow d-sm-none">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        id="searchDropdown"
                                        role="button"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        <i className="fas fa-search fa-fw"></i>
                                    </a>
                                    {/* Dropdown - Messages */}
                                    <div
                                        className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                                        aria-labelledby="searchDropdown"
                                    >
                                        <form className="form-inline mr-auto w-100 navbar-search">
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    className="form-control bg-light border-0 small"
                                                    placeholder="Search for..."
                                                    aria-label="Search"
                                                    aria-describedby="basic-addon2"
                                                />
                                                <div className="input-group-append">
                                                    <button
                                                        className="btn btn-primary"
                                                        type="button"
                                                    >
                                                        <i className="fas fa-search fa-sm"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </li>

                                {/* <!-- Nav Item - Alerts --> */}
                                <li className="nav-item dropdown no-arrow mx-1">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        id="alertsDropdown"
                                        role="button"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        <i className="fas fa-bell fa-fw"></i>
                                        {/* <!-- Counter - Alerts --> */}
                                        <span
                                            className={
                                                !dataBarang.length
                                                    ? "d-none"
                                                    : "badge badge-danger badge-counter"
                                            }
                                        >
                                            {dataBarang.length}
                                        </span>
                                    </a>
                                    {/* <!-- Dropdown - Alerts --> */}
                                    <div
                                        className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                        aria-labelledby="alertsDropdown"
                                    >
                                        <h6 className="dropdown-header">
                                            Stok Barang Minimum
                                        </h6>

                                        {dataBarang.map((item, index) => {
                                            return (
                                                <a
                                                    className="dropdown-item d-flex align-items-center"
                                                    href="#"
                                                >
                                                    <div className="mr-3">
                                                        {/* <div className="icon-circle bg-primary">
                                                            <i className="fas fa-file-alt text-white"></i>
                                                        </div> */}
                                                        <div
                                                            style={{
                                                                width: 50,
                                                                height: 50,
                                                            }}
                                                        >
                                                            <img
                                                                src={`../../../foto_barang/${item.image}`}
                                                                alt="image-barang"
                                                                style={{
                                                                    width: "100%",
                                                                    height: "100%",
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="small text-gray-500">
                                                            December 12, 2019
                                                        </div>
                                                        <span className="font-weight-bold">
                                                            {item.nama_barang}{" "}
                                                            <br />
                                                            Stok:{" "}
                                                            {item.quantity}
                                                        </span>
                                                    </div>
                                                </a>
                                            );
                                        })}
                                        {/* <a
                                            className="dropdown-item d-flex align-items-center"
                                            href="#"
                                        >
                                            <div className="mr-3">
                                                <div className="icon-circle bg-success">
                                                    <i className="fas fa-donate text-white"></i>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="small text-gray-500">
                                                    December 7, 2019
                                                </div>
                                                $290.29 has been deposited into
                                                your account!
                                            </div>
                                        </a>
                                        <a
                                            className="dropdown-item d-flex align-items-center"
                                            href="#"
                                        >
                                            <div className="mr-3">
                                                <div className="icon-circle bg-warning">
                                                    <i className="fas fa-exclamation-triangle text-white"></i>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="small text-gray-500">
                                                    December 2, 2019
                                                </div>
                                                Spending Alert: We've noticed
                                                unusually high spending for your
                                                account.
                                            </div>
                                        </a> */}
                                        <a
                                            className="dropdown-item text-center small text-gray-500"
                                            href="/barang"
                                        >
                                            Show All Alerts
                                        </a>
                                    </div>
                                </li>

                                <div className="topbar-divider d-none d-sm-block"></div>

                                {/* Nav Item - User Information  */}
                                <li className="nav-item dropdown no-arrow">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        id="userDropdown"
                                        role="button"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        <span
                                            className="mr-2 d-none d-lg-block text-gray-600 small"
                                            style={{ fontSize: 16 }}
                                        >
                                            {auth.user.name}
                                        </span>
                                        <i
                                            className="fas fa-user-circle "
                                            style={{ fontSize: 30 }}
                                        ></i>
                                    </a>
                                    {/* Dropdown - User Information  */}
                                    <div
                                        className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                        aria-labelledby="userDropdown"
                                    >
                                        <a className="dropdown-item" href="#">
                                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Profile
                                        </a>
                                        <a className="dropdown-item" href="#">
                                            <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Settings
                                        </a>
                                        <a className="dropdown-item" href="#">
                                            <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Activity Log
                                        </a>
                                        <div className="dropdown-divider"></div>
                                        <a
                                            className="dropdown-item text-danger"
                                            href="#"
                                            data-toggle="modal"
                                            data-target="#logoutModal"
                                        >
                                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-danger"></i>
                                            Logout
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                        {/* End of Topbar  */}

                        {/* Begin Page Content  */}
                        <div className="container-fluid">{children}</div>
                        {/* /.container-fluid  */}
                    </div>
                    {/* End of Main Content  */}

                    {/* Footer  */}
                    <footer className="sticky-footer bg-white">
                        <div className="container my-auto">
                            <div className="copyright text-center my-auto">
                                <span>Aplikasi Inventori App</span>
                            </div>
                        </div>
                    </footer>
                    {/* End of Footer  */}
                </div>
                {/* End of Content Wrapper  */}
            </div>

            {/* End of Page Wrapper */}
            {/* Scroll to Top Button */}

            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
            </a>
            <div
                className="modal fade"
                id="logoutModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Logout
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
                            Anda Ingin Logout?
                        </div>
                        <div className="modal-footer">
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Template;
