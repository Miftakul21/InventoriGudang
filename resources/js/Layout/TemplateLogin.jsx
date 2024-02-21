import React from "react";
import { Link } from "@inertiajs/react";

const TemplateAuth = ({ children }) => {
    return (
        <div className="container">
            <div className="row justify-content-center mt-5">{children}</div>
        </div>
    );
};

export default TemplateAuth;
