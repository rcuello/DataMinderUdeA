import React , {useEffect , useState } from "react";
import {Link,NavLink} from "react-router-dom";


function Login() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    
    const onLoginClick =()=>{
        console.log("email: ",email);
        console.log("password: ",password);
    }

    //Video 14
    // 01:02:05
    //http://ingeniaudea.edu.co/zoom-recordings/recordings/docenciaingenia111@udea.edu.co/99562013521/2021-02-28
    //Agregar un watcher a la variable email
    /*useEffect (()=>{
        console.log("cambio de email");

    },[email]);*/

    return (
       
    <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5">
                        <div className="card shadow-lg border-0 rounded-lg mt-5">
                            <div className="card-header"><h3 className="text-center font-weight-light my-4">Iniciar sesión</h3></div>


                            <div className="card-body text-center py-3">
                                <div className="small">
                                    <a href="#" className="btn btn-danger btn-block"><i className="fab fa-google"></i> Continuar con <b>Google</b></a>
                                </div>
                            </div>

                            <div className="or-seperator"><i>o</i></div>

                            <div className="card-body">
                                <form>
                                    <div className="form-floating mb-3">
                                        <input className="form-control" id="inputEmail" type="email" placeholder="usuario" onChange ={(e)=> setEmail(e.target.value)} />
                                        <label html="inputEmail">Usuario</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input className="form-control" id="inputPassword" type="password" placeholder="Contraseña" onChange ={(e)=> setPassword(e.target.value)}/>
                                        <label html="inputPassword">Contraseña</label>
                                    </div>
                                    <div className="form-check mb-3">
                                        <input className="form-check-input" id="inputRememberPassword" type="checkbox" value="" />
                                        <label className="form-check-label" html="inputRememberPassword">Recordar contraseña</label>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                        <NavLink to="/recovery" className="small">Olvidaste contraseña?</NavLink>
                                        <NavLink to="/admin" className="btn btn-primary" onClick={onLoginClick}>Iniciar sesion</NavLink>
                                    </div>
                                </form>
                            </div>

                            <div className="card-footer text-center py-3">
                                <div className="small">
                                    <Link to="/register">
                                        Necesitas crear una cuenta?
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    </div>
        
    )
}


export default Login;