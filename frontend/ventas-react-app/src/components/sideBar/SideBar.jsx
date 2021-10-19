import React from "react";
import { Link } from 'react-router-dom';

const SideBar = ()=>{
    return <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div className="sb-sidenav-menu">
            <div className="nav">
                <div className="sb-sidenav-menu-heading">Panel admin.</div>
                <SideBarPage icono="fas fa-tachometer-alt"  nombre="Inicio" ruta="/admin"/>
                <SideBarPage icono="fas fa-columns"         nombre="Usuarios" ruta="/admin/users"/>
                <SideBarPage icono="fas fa-columns"         nombre="Productos" ruta="/admin/products"/>
                <SideBarPage icono="fas fa-columns"         nombre="Ventas" ruta="/admin/sales"/>
            </div>
        </div>
        <div className="sb-sidenav-footer">
            <div className="small">Logged in as:</div>
            administrador
        </div>
    </nav>
}

const SideBarPage = ({icono,ruta,nombre})=>{
    return (
        <Link className="nav-link" to={ruta}>
            <div className="sb-nav-link-icon"><i className={icono}></i></div>
            {nombre}
        </Link>
    )
}

export default SideBar;