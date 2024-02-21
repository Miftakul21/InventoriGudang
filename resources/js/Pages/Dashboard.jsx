import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import Template from "@/Layout/Template";

const Dashboard = () => {
    const { user } = usePage().props;
    const { barang } = usePage().props;
    const { barangMasuk } = usePage().props;
    const { barangKeluar } = usePage().props;

    return (
        <Template>
            <Head title="InventoriApp - Dashboard" />
            <div className="d-sm-flex align-items-center">
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
            </div>

            {/* Content Row  */}
            <div class="row">
                {/* Earnings (Monthly) Card Example  */}
                <div class="col-xl-3 col-md-4 mb-4">
                    <div class="card border-left-primary shadow h-100 py-2">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        User
                                    </div>
                                    <div class="h5 mb-0 font-weight-bold text-gray-800">
                                        {user.length}
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <i class="fas fa-user-tie fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Earnings (Monthly) Card Example  */}
                <div class="col-xl-3 col-md-4 mb-4">
                    <div class="card border-left-success shadow h-100 py-2">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                        Barang
                                    </div>
                                    <div class="h5 mb-0 font-weight-bold text-gray-800">
                                        {/* {paketInternet.length} */}
                                        {barang.length}
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <i class="fas fa-globe fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Earnings (Monthly) Card Example  */}
                <div class="col-xl-3 col-md-4 mb-4">
                    <div class="card border-left-info shadow h-100 py-2">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs font-weight-bold text-info text-uppercase mb-1">
                                        Barang Masuk
                                    </div>
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-auto">
                                            <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                                                {/* {customerInvoice.length} */}
                                                {barangMasuk.length}
                                            </div>
                                        </div>
                                        {/* <div class="col"></div> */}
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pending Requests Card Example  */}
                <div class="col-xl-3 col-md-6 mb-4">
                    <div class="card border-left-warning shadow h-100 py-2">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                        Barang Keluar
                                    </div>
                                    <div class="h5 mb-0 font-weight-bold text-gray-800">
                                        {barangKeluar.length}
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <i class="fas fa-comments fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Template>
    );
};

export default Dashboard;
