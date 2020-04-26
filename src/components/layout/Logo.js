import React from "react";
import {Link} from "react-router-dom";
import logo from "../../assets/img/logo/atrappos-logo-192x192.png";

export const Logo = (props) => {
    const {logoCls} = props;
    return (
        <Link to={"/"} className={"logo " + (logoCls)} title="Back to home">
            <img src={logo} alt="atrappos logo"/>
            <h1>
                Atrappos
            </h1>
        </Link>
    )
};