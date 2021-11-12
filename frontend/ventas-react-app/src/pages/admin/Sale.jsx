import React ,{useState,useRef,useEffect } from 'react';
import { NavLink , useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button ,Modal } from 'react-bootstrap';
import {nanoid} from "nanoid";
import { useAuth0 } from "@auth0/auth0-react";
import { getProductos,createVenta } from '../../utils/api';


const Sale = () => {

    const [show, setShow] = useState(false);
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user,logout,isAuthenticated,isLoading } = useAuth0();
    const [productosBackEnd, setProductosBackEnd] = useState([]);
    const [ejecutarConsulta, setEjecutarConsulta] = useState(true);

    useEffect(()=>{
        

        const fetchProductos = async ()=>{
         setLoading(true);
         
         await getProductos(
             (response)=>{
                 //console.log('la respuesta que se recibio fue', response);
                 setProductosBackEnd(response.data);
                 setEjecutarConsulta(false);
                 setLoading(false);
                 
 
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


    var username = "";

    if(isAuthenticated){
        username=user.nickname;
    }

    const handleClose = () => setShow(false);

    const handleSubmit = (e)=>{
        e.preventDefault();
        setShow(true);
    }
    
    const formulario = useRef(null);

    const handleSaveChanges =async ()=>{
        //formulario.current => html de todo el formulario
        const fd = new FormData(formulario.current);

        const frmVenta = {};

        fd.forEach((value, key) => {
            frmVenta[key] = value;
        });

        let result={
            currentUser:username,
            saleId: frmVenta["codigoVenta"],
            buyer:frmVenta["comprador"],
            total:0,
            amount:0,
            lineCount:productos.length,
            products:[]
        }

        productos.forEach(function (item, index) {

            let productId = frmVenta["r-"+index+"_productId"];
            let amount = parseFloat(frmVenta["r-"+index+"_amount"]);
            let price = parseFloat(frmVenta["r-"+index+"_price"]);
            let total = amount * price;
            let prod = productosBackEnd.find(x => x._id === productId);
            
            result.products.push({
                productId : productId,
                name:prod.name,
                amount: amount,
                price : price,
                total: total
            });

            result.total += total;
            result.amount+=amount;
            
        });

        console.log(result);

        await createVenta(result,(response)=>{
            //TODO : quitar modal
            setShow(false);
            toast.success('Venta almacenada con éxito');

        },(error)=>{
                console.log(error);
                toast.error('Venta almacenado con error: '+error);
        });
        
    }

    return (
        <form ref={formulario} onSubmit={handleSubmit} autoComplete="off">
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
                            
                                <NavLink className="btn btn-secondary" to="/admin/sales">
                                    Ver todos
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <div className="form-floating mb-3 mb-md-0">
                                        <input className="form-control" 
                                        name="codigoVenta" 
                                        required
                                        id="codigoVenta" type="text" placeholder="Codigo de la venta" />
                                        <label htmlFor="codigoVenta">Codigo de la venta</label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <input className="form-control"
                                        name="comprador"
                                        required
                                        id="comprador" type="text" placeholder="Comprador" />
                                        <label htmlFor="comprador">Comprador</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-12">
                                    <TableProductos productos={productos} setProductos={setProductos} productosBackEnd={productosBackEnd} setProductosBackEnd={setProductosBackEnd}/>
                                </div>
                            </div>
                            
                            
                            <div className="row">
                                <div className="d-flex justify-content-end">
                                    <NavLink  className="btn btn-secondary" to="/admin/sales">
                                        Cancelar
                                    </NavLink>
                                    <span>&nbsp;</span>
                                    <Button variant="primary" type="submit">
                                        Guardar
                                    </Button>
                                </div>
                            </div>
                        
                    </div>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Información</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        ¿Está seguro de querer almacenar esta venta?
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
                <ToastContainer position='bottom-center' autoClose={5000} />
            </div>
        </form>
    )
}

export default Sale;

const TableProductos =({productos, setProductos,productosBackEnd,setProductosBackEnd})=>{
    //const [productos, setProductos] = useState([]);
    
    console.log(productosBackEnd);
    /*let productosBackEnd =[
        {"_id":"001",name:"Portatil",price:230000},
        {"_id":"002",name:"Lapiz",price:40000}
    ];*/

    const formulario = useRef(null);

    /*useEffect(()=>{

        console.log(vehiculoAAgregar);
    },[vehiculoAAgregar]);
    */

   

    const addNewProducto = ()=>{

        var selectedProducto = productosBackEnd[0];
        let producto = {
            rowId :nanoid(),
            items:productosBackEnd,
            selectedProducto: selectedProducto,
            amount:1,
            price:selectedProducto.price,
            total: 1 * selectedProducto.price
        }  ;

        console.log(selectedProducto);

        productos.push(producto);

        
        //console.log(productos);
        setProductos([...productos]);
    }

    const onProductoChanged = (e,productoRow)=>{
        //console.log(e.target.value);
        let productoBackEnd = productoRow.items.find(x => x._id === e.target.value);
        
        //console.log(productoBackEnd);

        /*let amount = parseFloat(productoRow.amount);
        let price = parseFloat(productoBackEnd.price);

        productoRow.price = price;
        productoRow.total = amount * price;*/

        let newproducto = {
            rowId :productoRow.rowId,
            items:productosBackEnd,
            selectedProducto: productoBackEnd,
            amount:productoRow.amount,
            price:productoBackEnd.price,
            total: productoRow.amount * productoBackEnd.price
        }  ;

        /*console.log(amount);
        console.log(productoRow.amount);
        console.log(newproducto);*/

        let index = productos.findIndex(x => x.rowId === productoRow.rowId);
        productos[index] = newproducto;

        
        setProductos([...productos]);

        
        //console.log(selected);
        //console.log(productos);
        //let selected = productos.filter((v) => v._id === e.target.value)[0];
        //console.log(selected);

        //setVehiculoAAgregar(selected);
        
    }

    const onProductoAmountChange = (e,productoRow)=>{
        let amount = parseFloat(e.target.value);
        let price = parseFloat(productoRow.price);

        productoRow.total = amount * price;
        
        let index = productos.findIndex(x => x.rowId === productoRow.rowId);

        //console.log(index);
        productos[index] = productoRow;

        //productos.push(productoRow);

        setProductos([...productos]);
    }

    const onProductoDelete = (e,productoRow)=>{
        let index = productos.findIndex(x => x.rowId === productoRow.rowId);
        productos.splice(index, 1);

        setProductos([...productos]);
    }

    const formatCurrency = (amount)=>{
        const options1 = { style: 'currency', currency: 'COP' };
        const numberFormat1 = new Intl.NumberFormat('es-CO', options1);
        return numberFormat1.format(amount);
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
                                    <tr key={producto.rowId}>
                                        <td>
                                            
                                            <select
                                            onChange={(e)=>onProductoChanged(e,producto)}
                                            value={producto.selectedProducto._id}
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
                                            <input required name={"r-" + index +"_amount"} type="number" required defaultValue={producto.amount} onKeyUp={(e)=>onProductoAmountChange(e,producto)}/>
                                        </td>
                                        <td>
                                            {formatCurrency(producto.price)}
                                        </td>
                                        <td>
                                            {formatCurrency(producto.total)}
                                        </td>
                                        <td>
                                            <input name={"r-" + index +"_productId"} value={producto.selectedProducto._id} type="hidden"/>
                                            <input name={"r-" + index +"_price"} value={producto.price} type="hidden"/>

                                            <Button className="link-danger" onClick={(e) => onProductoDelete(e,producto)}>
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
