import React from "react";
import { Link, NavLink } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import PrivateComponent from "../routing/PrivateComponent";

const SideBar = ()=>{
    const { user,logout,isAuthenticated,isLoading } = useAuth0();
    var username = "";

    if(isAuthenticated){
        username=user.nickname;
    }

    return <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div className="sb-sidenav-menu">
            <div className="nav">
                <div className="sb-sidenav-menu-heading">Panel admin.</div>
                
                <SideBarPage icono="fas fa-tachometer-alt"  nombre="Inicio" ruta="/admin"/>
                
                <PrivateComponent roleList={["admin"]}>
                    <SideBarPage icono="fas fa-columns"         nombre="Usuarios" ruta="/admin/users"/>
                </PrivateComponent>
                <PrivateComponent roleList={["admin","vendedor"]}>
                    <SideBarPage icono="fas fa-columns"         nombre="Productos" ruta="/admin/products"/>
                    <SideBarPage icono="fas fa-columns"         nombre="Ventas" ruta="/admin/sales"/>
                </PrivateComponent>
                
            </div>
        </div>
        
        <div className="sb-sidenav-footer">
        {
            isAuthenticated ? <DisplayName username={username}/> :
            <NavLink to="/login">Iniciar sesión</NavLink>
        }
        </div>
    </nav>
}

const DisplayName = ({username}) => {
    const { logout } = useAuth0();

    return (
        <>
        <button onClick={() => logout({ returnTo: window.location.origin })}>
        Cerrar sesión
        </button>
            <div className="small">Logged in as:</div>
            {username}
        </>
    );
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