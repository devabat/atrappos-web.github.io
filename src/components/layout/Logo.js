import React from "react";
import {Link} from "react-router-dom";
import logo from "../../assets/img/logo/logo.png";

export const Logo = (props) => {
    const {logoCls} = props;
    return (
        <Link to={"/home"} className={"logo " + (logoCls)} title="Back to home">
            <img src={logo} alt="atrappos logo"/>
        </Link>
    )
};