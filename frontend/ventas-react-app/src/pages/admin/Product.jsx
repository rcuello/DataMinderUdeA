import React, {useState,useRef,useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { createProducto } from '../../utils/api';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button ,Modal } from 'react-bootstrap';

const Product = () => {
    //States
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const formulario = useRef(null);

    const handleSubmit = (e)=>{
        e.preventDefault();
        setShow(true);
    }

    const handleSaveChanges =async ()=>{
        const fd = new FormData(formulario.current);

        const nuevoProducto = {};

        fd.forEach((value, key) => {
            nuevoProducto[key] = value;
        });

        console.log(nuevoProducto);

        await createProducto(nuevoProducto,(response)=>{
            //TODO : quitar modal
            setShow(false);
            toast.success('Producto almacenado con éxito');

        },(error)=>{
                console.log(error);
                toast.error('Producto almacenado con error: '+error);
        })

        
    }

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
                    <form onSubmit={handleSubmit} ref={formulario}>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <div className="form-floating mb-3 mb-md-0">
                                    <input className="form-control" name="id" type="text" placeholder="Codigo del producto" required/>
                                    <label htmlFor="id">Codigo</label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input className="form-control" name="name" type="text" placeholder="Nombre del producto" required/>
                                    <label htmlFor="name">Nombre</label>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <div className="form-floating">
                                        <input className="form-control" name="price" type="text" placeholder="Precio del producto" required/>
                                        <label htmlFor="price">Precio</label>
                                </div>
                                
                                
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="d-flex justify-content-end">
                                <NavLink  className="btn btn-secondary" to="/admin/products">
                                    Cancelar
                                </NavLink>
                                <span>&nbsp;</span>
                                <Button variant="primary"  onClick={handleShow}>
                                    Guardar
                                </Button>
                            </div>
                        </div>
                        
                    </form>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Está seguro de querer almacenar el producto?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Guardar cambios
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Product;
