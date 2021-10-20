import React ,{useEffect , useState} from 'react';
import {NavLink} from "react-router-dom";
import { getUsuarios } from '../../utils/api';

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
    
    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Usuarios</h1>
            
            <div className="card mb-4">
            <div className="card-header">
                    <div className="row">
                        <div className="col-10">
                            <i className="fas fa-table me-1"></i>
                            Administración de usuarios
                        </div>
                        <div className="col">
                        
                            <NavLink className="btn btn-secondary" to="/admin/user">
                                <span className="far fa-plus-square"></span>
                                Nuevo
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <TablaUsuarios listaUsuarios={usuarios}/>
                </div>
            </div>
        </div>
    )
}


const TablaUsuarios = ({listaUsuarios})=>{
    return (
        <table id="datatablesSimple" className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Correo</th>
                                <th>Rol</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                        {listaUsuarios.map((item,index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.firstName} </td>
                                    <td>{item.lastName}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <NavLink to={`/admin/user/${item.id}`}>Editar</NavLink>
                                    </td>
                                </tr>
                            ) 
                        })}
                        </tbody>
                    </table>
    )

}


export default Users;
