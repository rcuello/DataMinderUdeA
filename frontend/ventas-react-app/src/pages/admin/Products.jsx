import React from 'react'
import { useEffect, useState } from "react";

const Products = () => {

    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [textoBoton, setTextoBoton] = useState("Crear nuevo producto");

    useEffect(()=>{
        if(mostrarTabla){
            setTextoBoton("Crear nuevo producto");
        }else{
            setTextoBoton("Mostrar todos los productos");
        }
    }
    ,[mostrarTabla]);

    return (
        <div className="container-fluid px-4">
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
                        
                            <button 
                            onClick ={()=> {
                                setMostrarTabla(!mostrarTabla)
                            }}
                            type="button" className="btn btn-secondary">
                                <span className="far fa-plus-square"></span>
                                {textoBoton}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    {mostrarTabla ? <Detalle/> : <Formulario/>}
                </div>
            </div>
        </div>
    )
}

const Detalle = ()=>{
    return (
                <table id="dtDataSet" className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>01</td>
                                <td>Computador de Mesa</td>
                                <td>23</td>
                            </tr>
                            <tr>
                                <td>02 </td>
                                <td>Lapiz optico</td>
                                <td>23</td>
                                
                            </tr>
                            <tr>
                                <td>03 </td>
                                <td>Pantalla LCD</td>
                                <td>23</td>
                            </tr>
                            
                        </tbody>
                    </table>
    )
}

const Formulario = ()=>{
    return (
        <div>
            Formulario
        </div>
    )
}

export default Products
