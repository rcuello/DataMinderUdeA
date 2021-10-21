import React from 'react';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button ,Modal } from 'react-bootstrap';

import { getProductos,deleteProducto } from '../../utils/api';

const Products = () => {
    //States   
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [ejecutarConsulta, setEjecutarConsulta] = useState(true);

    //funciones
    useEffect(()=>{

        const fetchProductos = async ()=>{
         setLoading(true);
         
         await getProductos(
             (response)=>{
                 //console.log('la respuesta que se recibio fue', response);
                 setProductos(response.data);
                 setEjecutarConsulta(false);
                 setLoading(false);
                 //toast.success('Vehículo modificado con éxito');
 
             },(error)=>{
                 console.error('Salio un error:', error);
                 setLoading(false);
                 toast.error('error al cargar productos: '+ error);
             });
        }
 
        if(ejecutarConsulta){
            fetchProductos();
        }
 
     },[ejecutarConsulta]);
 
     useEffect(() => {
         //obtener lista de vehículos desde el backend
         setEjecutarConsulta(true);
       }, []);
   

    return (
        <div className="container-fluid px-4">
            <ToastContainer position='bottom-center' autoClose={5000} />
            <h1 className="mt-4">Productos</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Productos</li>
            </ol>
            <div className="card mb-4">
                <div className="card-header">
                    <div className="row">
                        <div className="col-10">
                            <i className="fas fa-table me-1"></i>
                            Administración de productos
                        </div>
                        <div className="col">
                        
                            <NavLink className="btn btn-secondary" to="/admin/product/new">
                                <span className="far fa-plus-square"></span>
                                Nuevo
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <TablaProductos listaProductos={productos}/> 
                </div>
            </div>
            
        </div>
    )
}

const TablaProductos = ({listaProductos})=>{

    //States
    const [show, setShow] = useState(false);
    const [deleteEntity, setDeleteEntity] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Functions
    const confirmDelete = (item)=>{
        //console.log(item);
        setDeleteEntity(item);
        setShow(true);
    }

    const handleSaveChanges =async ()=>{
        
        await deleteProducto(deleteEntity.item._id,(response)=>{
            //TODO : quitar modal
            setShow(false);
            toast.success('Producto eliminado con éxito');

        },(error)=>{
                //console.log(error);
                toast.error(''+ error);
        })

        
    }

    return (
                <table id="dtDataSet" className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        {listaProductos.map((item,index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.id} </td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <NavLink className="btn btn-primary" to={`/admin/product/edit/${item._id}`}>Editar</NavLink>
                                        <Button variant="danger" onClick={(e)=> confirmDelete({item})}>Eliminar</Button>
                                    </td>
                                    
                                </tr>
                            ) 
                        })}
                            
                        </tbody>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Modal heading</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                ¿Está seguro de querer eliminar el producto?
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Cerrar
                                </Button>
                                <Button variant="primary" onClick={handleSaveChanges}>
                                    Aplicar cambios
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        
                    </table>
    )
}



export default Products
