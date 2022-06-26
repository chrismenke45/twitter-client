import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react"

import NavMargin from "../components/NavMargin";


const ErrorPage = (props) => {
    const { user, setFireApiCall } = props

    return (
        <div className="centerPage">
            <h3>Oops something when wrong.  Please return <Link to="/home">home</Link></h3>
        </div>
    )

}
export default ErrorPage