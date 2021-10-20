import React from 'react';
import {NavLink} from "react-router-dom";

const Users = () => {

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Usuarios</h1>
            
            <div className="card mb-4">
            <div className="card-header">
                    <div className="row">
                        <div className="col-10">
                            <i className="fas fa-table me-1"></i>
                            Administración de usuarios
                        </div>
                        <div className="col">
                        
                            <NavLink className="btn btn-secondary" to="/admin/user">
                                <span className="far fa-plus-square"></span>
                                Nuevo
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <table id="datatablesSimple" className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Correo</th>
                                <th>Rol</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Tiger</td>
                                <td>Nixon</td>
                                <td>Nixon@yopmail.com</td>
                                <td>Vendedor</td>
                                <td>
                                <NavLink to="/admin/user/key1">Editar</NavLink>
                                </td>
                            </tr>
                            <tr>
                                <td>Garrett </td>
                                <td>Winters</td>
                                <td>Winters@yopmail.com</td>
                                <td>Vendedor</td>
                                <td>
                                    <NavLink to="/admin/user/key1">Editar</NavLink>
                                </td>
                            </tr>
                            <tr>
                                <td>Ashton </td>
                                <td>Cox</td>
                                <td>Cox@yopmail.com</td>
                                <td>Admin</td>
                                <td>
                                <NavLink to="/admin/user/key1">Editar</NavLink>
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}


export default Users;
