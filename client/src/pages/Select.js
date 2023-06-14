import React, {useState} from "react";
import { Link } from 'react-router-dom';

// rendered in the /select route
export default function Select(){
    return ( 
        <div className="center">
            <Link to="/login"><button type="button" className="btn btn-outline-info" style={{margin: "10px"}}>Login</button></Link>
            <Link to="/register"><button type="button" class="btn btn-outline-success">Register</button></Link>
        </div>
    ); 
}