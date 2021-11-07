import React ,{useState,useRef,useEffect } from 'react';
import { NavLink , useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button ,Modal } from 'react-bootstrap';
import {nanoid} from "nanoid";


const Sale = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    
    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Venta</h1>
            
            <div className="card mb-4">
            <div className="card-header">
                    <div className="row">
                        <div className="col-10">
                            <i className="fas fa-table me-1"></i>
                            Registro de ventas
                        </div>
                        <div className="col">
                        
                            <NavLink className="btn btn-secondary" to="/admin/users">
                                Ver todos
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <form autoComplete="off"> 
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <div className="form-floating mb-3 mb-md-0">
                                    <input className="form-control" 
                                    name="firstName" 
                                   
                                    id="inputFirstName" type="text" placeholder="Codigo de la venta" />
                                    <label htmlFor="inputFirstName">Codigo de la venta</label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input className="form-control" 
                                    name="lastName"
                                   
                                    id="inputLastName" type="text" placeholder="Comprador" />
                                    <label htmlFor="inputLastName">Comprador</label>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-12">
                                <TableProductos />
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
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Está seguro de querer almacenar el usuario?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary">
                        Guardar cambios
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer position='bottom-center' autoClose={5000} />
        </div>
    )
}

export default Sale;

const TableProductos =()=>{
    const [vehiculoAAgregar, setVehiculoAAgregar] = useState({});
    const [productos, setProductos] = useState([]);
    let productosBackEnd =[
        {"_id":"001",name:"Portatil",price:230000},
        {"_id":"002",name:"Lapiz",price:40000}
    ];

    /*useEffect(()=>{

        console.log(vehiculoAAgregar);
    },[vehiculoAAgregar]);
    */
    const addNewProducto = ()=>{
        let producto = {
            items:productosBackEnd,
            name:"table",
            amount:0,
            price:2,
            total:0
        }  ;

        productos.push(producto);

        
        //console.log(productos);
        setProductos([...productos]);
    }

    const onProductoChanged = (e)=>{
        console.log(e.target.value);
        console.log(productos);
        let selected = productos.filter((v) => v._id === e.target.value)[0];
        console.log(selected);

        setVehiculoAAgregar(selected);
        
    }

    return (
        <table id="dtDataSet" className="table table-striped table-bordered">
        <thead>
            <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Total</th>
                <th>
                    <Button className="link-dark" to="/admin/user/new" onClick={addNewProducto}>
                                    <i className="far fa-plus-square"></i>
                    </Button>
                </th>
            </tr>
        </thead>
        <tbody>
        
                    {productos.map((producto,index) => {
                            return (
                                <tr key={nanoid()}>
                                    <td>
                                        <select
                                        onChange={(e)=>onProductoChanged(e)}
                                        >
                                            <option disabled value=''>
                                            Seleccione un producto
                                            </option>
                                            {
                                                producto.items.map((el) => {
                                                return (
                                                    <option key={nanoid()} value={el._id}>
                                                        {`${el.name}`}
                                                    </option>
                                                );
                                                })
                                            }
                                        </select>
                                    </td>
                                    <td>
                                        <input type="number" required defaultValue={producto.amount}/>
                                    </td>
                                    <td>{producto.price}</td>
                                    <td>{producto.total}</td>
                                    <td>
                                    <Button className="link-danger">
                                                <i className="fas fa-trash"></i>
                                    </Button>
                                    </td>
                                </tr>
                            ) 
                        })}     
            
        </tbody>
        
    </table>

    );
}
