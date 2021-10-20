import React from 'react';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = () => {
    return (
        <div className="container-fluid px-4">
            <ToastContainer position='bottom-center' autoClose={5000} />
            <h1 className="mt-4">Producto</h1>
            
            <div className="card mb-4">
            <div className="card-header">
                    <div className="row">
                        <div className="col-10">
                            <i className="fas fa-table me-1"></i>
                            Registro de productos
                        </div>
                        <div className="col">
                        
                            <NavLink className="btn btn-secondary" to="/admin/products">
                                Ver todos
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <form>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <div className="form-floating mb-3 mb-md-0">
                                    <input className="form-control" id="codigo" type="text" placeholder="Ingrese su primer nombre" />
                                    <label htmlFor="codigo">Codigo</label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input className="form-control" id="nombre" type="text" placeholder="Ingrese su apellido" />
                                    <label htmlFor="nombre">Nombre</label>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <div className="form-floating">
                                        <input className="form-control" id="precio" type="text" placeholder="Ingrese precio" />
                                        <label htmlFor="precio">Precio</label>
                                </div>
                                
                                
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                    <NavLink  className="btn btn-primary btn-block" to="/admin/products">
                                        Guardar
                                    </NavLink>
                            </div>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Product;
