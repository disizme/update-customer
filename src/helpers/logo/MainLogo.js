import React from 'react'
import logo from "../media/logo.png";

export default function MainLogo(props){
    return <div className={`brand-logo ${props.className || ""}`}>
        <img src={props.photo ? props.photo : logo} 
        onError={(e) => {
            e.target.onerror = null 
            e.target.src = logo}}
        alt="logo" />
    </div>
}
