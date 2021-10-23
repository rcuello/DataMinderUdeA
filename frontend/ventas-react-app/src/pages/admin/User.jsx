import React ,{useState,useRef,useEffect } from 'react';
import { NavLink , useParams } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button ,Modal } from 'react-bootstrap';

const User = () => {

    const { id } = useParams();

    const [editMode, setEditMode] = useState(id!==undefined);
    const [usuarioEditable,setUsuarioEditable] = useState({});
    const [show, setShow] = useState(false);

    const formulario = useRef(null);

    const handleSubmit = (e)=>{
        e.preventDefault();
        setShow(true);
    }

    const onGuardar_Click = ()=>{
        console.log("guardar");
    }


    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Usuario</h1>
            
            <div className="card mb-4">
            <div className="card-header">
                    <div className="row">
                        <div className="col-10">
                            <i className="fas fa-table me-1"></i>
                            Registro de usuarios
                        </div>
                        <div className="col">
                        
                            <NavLink className="btn btn-secondary" to="/admin/users">
                                Ver todos
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <form ref={formulario} onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <div className="form-floating mb-3 mb-md-0">
                                    <input className="form-control" id="inputFirstName" type="text" placeholder="Ingrese su primer nombre" />
                                    <label htmlFor="inputFirstName">Primer nombre</label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input className="form-control" id="inputLastName" type="text" placeholder="Ingrese su apellido" />
                                    <label htmlFor="inputLastName">Apellido</label>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <input className="form-control" id="inputEmail" type="email" placeholder="name@example.com" />
                                <label htmlFor="inputEmail">Dirección de correo electrónico</label>
                            </div>
                            <div className="col-md-6">
                                <select className="form-select" required  defaultValue={0} name="roleName">
                                    <option  disabled value={0}>Seleccionar Rol</option>
                                    <option value="admin">Administrador</option>
                                    <option value="vendedor">Vendedor</option>
                                </select>
                            </div>
                            
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <div className="form-floating mb-3 mb-md-0">
                                    <input className="form-control" id="inputPassword" type="password" placeholder="Crea una contraseña" />
                                    <label htmlFor="inputPassword">Contraseña</label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating mb-3 mb-md-0">
                                    <input className="form-control" id="inputPasswordConfirm" type="password" placeholder="Confirmar Contraseña" />
                                    <label htmlFor="inputPasswordConfirm">Confirmar Contraseña</label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="d-flex justify-content-end">
                                <NavLink  className="btn btn-secondary" to="/admin/users">
                                    Cancelar
                                </NavLink>
                                <span>&nbsp;</span>
                                <Button variant="primary" type="submit">
                                    Guardar
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
    )
}

export default User
