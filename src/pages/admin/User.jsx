import React ,{useState,useRef,useEffect } from 'react';
import { NavLink , useParams } from 'react-router-dom';
import { createUsuario,findUsuarioById,updateUsuario } from '../../utils/api';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button ,Modal } from 'react-bootstrap';

const User = () => {

    const { id } = useParams();

    const [editMode, setEditMode] = useState(id!==undefined);
    const [usuarioEditable,setUsuarioEditable] = useState({});
    const [show, setShow] = useState(false);
    const [currentRol,setCurrentRol] = useState("");

    const formulario = useRef(null);

    useEffect(()=>{
        
        const fetchUsuario = async (idUsuario)=>{
            
            await findUsuarioById(idUsuario,
                (response)=>{
                    setUsuarioEditable(response.data);
    
                },(error)=>{
                    console.error('Salio un error:', error);
                    toast.error("Ha ocurrido un error:"+error);
                    //setLoading(false);
                });
           }

        if(editMode){
            fetchUsuario(id);
        }

    },[]);
    

    const handleClose = () => setShow(false);

    const handleSubmit = (e)=>{
        e.preventDefault();
        setShow(true);
    }

    const handleSaveChanges =async ()=>{
        
        const nuevoUsuario = {...usuarioEditable};

        delete nuevoUsuario._id;

        //console.log(nuevoUsuario);

        if(editMode){
            //Patch
            await updateUsuario(usuarioEditable._id,nuevoUsuario,(response)=>{
                //TODO : quitar modal
                setShow(false);
                toast.success('Usuario actualizado con éxito');

            },(error)=>{
                    console.log(error);
                    toast.error('Usuario almacenado con error: '+error);
            });
        }
        
    }

    const onRoleChanged = (e)=>{
        console.log(e.target.value);
        usuarioEditable.rol=e.target.value;
        setUsuarioEditable(usuarioEditable);
    }

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Usuario</h1>
            
            <div className="card mb-4">
            <div className="card-header">
                    <div className="row">
                        <div className="col-10">
                            <i className="fas fa-table me-1"></i>
                            Registro de usuarios
                        </div>
                        <div className="col">
                        
                            <NavLink className="btn btn-secondary" to="/admin/users">
                                Ver todos
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <form ref={formulario} onSubmit={handleSubmit} autoComplete="off"> 
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <div className="form-floating mb-3 mb-md-0">
                                    <input className="form-control" 
                                    name="firstName" 
                                    readOnly
                                    defaultValue={editMode ? usuarioEditable.given_name : ""}
                                    id="inputFirstName" type="text" placeholder="Ingrese su primer nombre" />
                                    <label htmlFor="inputFirstName">Primer nombre</label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input className="form-control" 
                                    name="lastName"
                                    readOnly
                                    defaultValue={editMode ? usuarioEditable.family_name : ""}
                                    id="inputLastName" type="text" placeholder="Ingrese su apellido" />
                                    <label htmlFor="inputLastName">Apellido</label>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <div className="form-floating mb-3 mb-md-0">
                                    <input className="form-control" 
                                    name="email"
                                    readOnly
                                    defaultValue={editMode ? usuarioEditable.email : ""}
                                    id="inputEmail" type="email" placeholder="name@example.com" />
                                    <label htmlFor="inputEmail">Dirección de correo electrónico</label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <select className="form-select" value={usuarioEditable.rol} name="roleName" onChange={(e)=> onRoleChanged(e)} >
                                    <option value="admin">Administrador</option>
                                    <option value="vendedor">Vendedor</option>
                                </select>
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
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Guardar cambios
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer position='bottom-center' autoClose={5000} />
        </div>
        
    )
}

export default User
