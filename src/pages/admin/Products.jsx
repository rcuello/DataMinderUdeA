import React from 'react';
import { NavLink,Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import NumberFormat from 'react-number-format';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button ,Modal } from 'react-bootstrap';
import {nanoid} from "nanoid";

import { getProductos,deleteProducto, findProductoByCodigo } from '../../utils/api';

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
   
    
    //Is it possible to share states between components using the useState() hook in React?
    //https://stackoverflow.com/questions/53451584/is-it-possible-to-share-states-between-components-using-the-usestate-hook-in-r
    //https://es.reactjs.org/docs/lifting-state-up.html   
    const onProductoDeletedHandler = () =>{
        setEjecutarConsulta(true);
    }   
    return (
        <div className="container-fluid px-4">
            <ToastContainer position='bottom-center' autoClose={5000} />
            <h1 className="mt-4">Productos</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Productos</li>
            </ol>
            <div className="card mb-4">
                <div className="card-header">
                    <div className="d-flex justify-content-between">
                        <div>
                            <i className="fas fa-table me-1"></i>
                            Administración de productos
                        </div>
                        <NavLink className="link-dark" to="/admin/product/new">
                                <i className="far fa-plus-square"></i>
                        </NavLink>
                    </div>
                </div>
                <div className="card-body">
                    {
                    (Array.isArray(productos) && productos.length) ?
                        <TablaProductos listaProductos={productos} onProductoDeleted={onProductoDeletedHandler} setProductos={setProductos} setEjecutarConsulta={setEjecutarConsulta}/>
                    :
                        <EmptyTable listaProductos={productos} onProductoDeleted={onProductoDeletedHandler} setProductos={setProductos} setEjecutarConsulta={setEjecutarConsulta}/>
                }
                </div>
            </div>
            
        </div>
    )
}

const TablaProductos = ({listaProductos , onProductoDeleted,setProductos,setEjecutarConsulta})=>{
    const [filtro, setFiltro] = useState("");
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
            
            onProductoDeleted();

            toast.success('Producto eliminado con éxito');

        },(error)=>{
                //console.log(error);
                toast.error(''+ error);
        })

        
    }

    const onBuscarClick = async (e)=>{
        console.log(filtro.length);

        if(filtro.length>0){
            await findProductoByCodigo(filtro,(response)=>{
                //console.log(response);
                if(response.data!=null){
                    let items=[];
                    items.push(response.data);
                    setProductos([...items]);
                }else{
                    setProductos([]);
                }
    
            },(error)=>{
                    console.log(error);
                    toast.error('Error: '+error);
            });
        }else{
            setEjecutarConsulta(true);
        }
        
    }

   

    return (
        <>
                <input type="text" placeholder="Buscar" onChange={(e)=> setFiltro(e.target.value)}/>
                <Button variant="primary" type="button" onClick={(e)=>onBuscarClick(e)}>
                                        Buscar
                </Button>

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
                                <tr key={nanoid()}>
                                    <td>{item.id} </td>
                                    <td>{item.name}</td>
                                    <td>{
                                            <NumberFormat thousandSeparator={true} value={item.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                         }
                                                                        </td>
                                    <td>
                                        <div className="d-flex justify-content-around">
                                            <NavLink className="link-primary" to={`/admin/product/edit/${item._id}`}>
                                                <i className="fas fa-pencil-alt"></i>
                                            </NavLink>
                                            
                                            <span>&nbsp;</span>
                                            
                                            <NavLink className="link-danger" to="#" onClick={(e)=> confirmDelete({item})}>
                                                <i className="fas fa-trash"></i>
                                            </NavLink>
                                        </div>
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
        </>
    )
}

const EmptyTable = ({listaProductos , onProductoDeleted,setProductos,setEjecutarConsulta}) =>{
    const [filtro, setFiltro] = useState("");
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
            
            onProductoDeleted();

            toast.success('Producto eliminado con éxito');

        },(error)=>{
                //console.log(error);
                toast.error(''+ error);
        })

        
    }

    const onBuscarClick = async (e)=>{
        console.log(filtro.length);

        if(filtro.length>0){
            await findProductoByCodigo(filtro,(response)=>{
                //console.log(response);
                if(response.data!=null){
                    let items=[];
                    items.push(response.data);
                    setProductos([...items]);
                }else{
                    setProductos([]);
                }
    
            },(error)=>{
                    console.log(error);
                    toast.error('Error: '+error);
            });
        }else{
            setEjecutarConsulta(true);
        }
        
    }
    return (
        <>
        <input type="text" placeholder="Buscar" onChange={(e)=> setFiltro(e.target.value)}/>
                <Button variant="primary" type="button" onClick={(e)=>onBuscarClick(e)}>
                                        Buscar
                </Button>
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
            <tr>
                <td colSpan="4">No hay productos disponibles</td>
            </tr>
        </tbody>
    </table>
    </>
    )
}



export default Products
