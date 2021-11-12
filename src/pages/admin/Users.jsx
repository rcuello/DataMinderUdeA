import React ,{useEffect , useState} from 'react';
import {NavLink} from "react-router-dom";
import { deleteUsuario, getUsuarios } from '../../utils/api';
import { Button ,Modal } from 'react-bootstrap';
import {nanoid} from "nanoid";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Users = () => {
     //States   
     const [usuarios, setUsuarios] = useState([]);
     const [loading, setLoading] = useState(false);
     const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
 

    //funciones
    useEffect(()=>{

       const fetchUsuarios = async ()=>{
        setLoading(true);
        
        await getUsuarios(
            (response)=>{
                //console.log('la respuesta que se recibio fue', response);
                setUsuarios(response.data);
                setEjecutarConsulta(false);
                setLoading(false);

            },(error)=>{
                console.error('Salio un error:', error);
                setLoading(false);
            });
       }

       if(ejecutarConsulta){
        fetchUsuarios();
       }

    },[ejecutarConsulta]);

    useEffect(() => {
        //obtener lista de vehículos desde el backend
        setEjecutarConsulta(true);
      }, []);

      const onUsuarioDeletedHandler = () =>{
        setEjecutarConsulta(true);
    }  
    
    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Usuarios</h1>
            <ToastContainer position='bottom-center' autoClose={5000} />
            
            <div className="card mb-4">
                <div className="card-header">
                        <div className="d-flex justify-content-between">
                            <div>
                                <i className="fas fa-table me-1"></i>
                                Administración de usuarios
                            </div>
                            <NavLink className="link-dark" to="/admin/user/new">
                                    <i className="far fa-plus-square"></i>
                            </NavLink>
                        </div>
                    </div>
                <div className="card-body">
                    <TablaUsuarios listaUsuarios={usuarios} onUsuarioDeleted={onUsuarioDeletedHandler}/>
                </div>
            </div>
        </div>
    )
}


const TablaUsuarios = ({listaUsuarios,onUsuarioDeleted})=>{
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
        
        await deleteUsuario(deleteEntity.item._id,(response)=>{
            //TODO : quitar modal
            setShow(false);
            
            onUsuarioDeleted();

            toast.success('Usuario eliminado con éxito');

        },(error)=>{
                //console.log(error);
                toast.error(''+ error);
        })

        
    }

    return (
        <>
        <input type="text" placeholder="Buscar"/>
        <table id="datatablesSimple" className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Nombres</th>
                                <th>Usuario</th>
                                <th>Correo</th>
                                <th>Rol</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                        {listaUsuarios.map((item,index) => {
                            return (
                                <tr key={nanoid()}>
                                    <td>{item.name} </td>
                                    <td>{item.nickname}</td>
                                    <td>{item.email}</td>
                                    <td>{item.rol}</td>
                                    <td>
                                        <div className="d-flex justify-content-around">
                                            <NavLink className="link-primary" to={`/admin/user/edit/${item._id}`}>
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
                                ¿Está seguro de querer eliminar el Usuario?
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


export default Users;