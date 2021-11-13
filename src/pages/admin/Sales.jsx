import React from 'react';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getVentas,findVentaBySaleId,deleteVenta } from '../../utils/api';
import { Button ,Modal } from 'react-bootstrap';
import {nanoid} from "nanoid";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sales = () => {
    //States   
    const [ventas, setVentas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
    
    //funciones
    useEffect(()=>{

        const fetchVentas = async ()=>{
         setLoading(true);
         
         await getVentas(
             (response)=>{
                 //console.log('la respuesta que se recibio fue', response);
                 setVentas(response.data);
                 setEjecutarConsulta(false);
                 setLoading(false);
 
             },(error)=>{
                 console.error('Salio un error:', error);
                 setLoading(false);
             });
        }
 
        if(ejecutarConsulta){
            fetchVentas();
        }
 
     },[ejecutarConsulta]);
 
     useEffect(() => {
         //obtener lista de vehículos desde el backend
         setEjecutarConsulta(true);
       }, []);

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Ventas</h1>
            <ToastContainer position='bottom-center' autoClose={5000} />
            
            <div className="card mb-4">
                <div className="card-header">
                        <div className="d-flex justify-content-between">
                            <div>
                                <i className="fas fa-table me-1"></i>
                                Administración de ventas
                            </div>
                            <NavLink className="link-dark" to="/admin/sales/new">
                                    <i className="far fa-plus-square"></i>
                            </NavLink>
                        </div>
                    </div>
                <div className="card-body">
                    <TablaVentas listaVentas={ventas} setVentas = {setVentas} setEjecutarConsulta={setEjecutarConsulta}/>
                </div>
            </div>
        </div>
    )
}

const TablaVentas = ({listaVentas,setVentas,setEjecutarConsulta})=>{
    const [filtro, setFiltro] = useState("");
    const [show, setShow] = useState(false);
    const [deleteEntity, setDeleteEntity] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const formatCurrency = (amount)=>{
        const options1 = { style: 'currency', currency: 'COP' };
        const numberFormat1 = new Intl.NumberFormat('es-CO', options1);
        return numberFormat1.format(amount);
    }

    const onBuscarClick = async (e)=>{
        console.log(filtro.length);

        if(filtro.length>0){
            await findVentaBySaleId(filtro,(response)=>{
                //console.log(response);
                if(response.data!=null){
                    let items=[];
                    items.push(response.data);
                    setVentas([...items]);
                }else{
                    setVentas([]);
                }
    
            },(error)=>{
                    console.log(error);
                    toast.error('Error: '+error);
            });
        }else{
            setEjecutarConsulta(true);
        }
        
    }

    const confirmDelete = (item)=>{
        setDeleteEntity(item);
        setShow(true);
    }

    const handleSaveChanges =async ()=>{
        
        await deleteVenta(deleteEntity.item._id,(response)=>{
            //TODO : quitar modal
            setShow(false);
            
            setEjecutarConsulta(true);

            toast.success('Venta eliminada con éxito');

        },(error)=>{
                //console.log(error);
                toast.error(''+ error);
        })

        
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
                                <th>#Venta</th>
                                <th>Vendedor</th>
                                <th>Comprador</th>
                                <th>Total venta</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        {listaVentas.map((item,index) => {
                            return (
                                <tr key={nanoid()}>
                                    <td>{item.saleId} </td>
                                    <td>{item.currentUser}</td>
                                    <td>{item.buyer}</td>
                                    <td>{formatCurrency(item.total)}</td>
                                    <td>
                                        <div className="d-flex justify-content-around">
                                            <NavLink className="link-primary" to={`/admin/sales/edit/${item._id}`}>
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
                                ¿Está seguro de querer eliminar la venta?
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

export default Sales
