import React from 'react';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getVentas } from '../../utils/api';
import {nanoid} from "nanoid";

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
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Ventas</li>
            </ol>
            <div className="card mb-4">
            <div className="card-header">
                    <div className="row">
                        <div className="col-10">
                            <i className="fas fa-table me-1"></i>
                            Administración de ventas
                        </div>
                        <div className="col">
                        
                            <button type="button" className="btn btn-default">
                                <span className="far fa-plus-square"></span>
                                Nuevo
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <TablaVentas listaVentas={ventas}/> 
                </div>
            </div>
        </div>
    )
}

const TablaVentas = ({listaVentas})=>{
    return (
                <table id="dtDataSet" className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>#Venta</th>
                                <th>Vendedor</th>
                                <th>Comprador</th>
                                <th>Total venta</th>
                            </tr>
                        </thead>
                        <tbody>
                        {listaVentas.map((item,index) => {
                            return (
                                <tr key={nanoid()}>
                                    <td>{item.id} </td>
                                    <td>{item.vendedor}</td>
                                    <td>{item.comprador}</td>
                                    <td>{item.totalVenta}</td>
                                    <td>
                                        <NavLink to="/admin/venta/key1">Editar</NavLink>
                                    </td>
                                </tr>
                            ) 
                        })}
                            
                        </tbody>
                    </table>
    )
}

export default Sales
