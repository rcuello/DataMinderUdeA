import React from 'react';
import {NavLink,Link} from "react-router-dom";

const RecoveryPwd = () => {
    return (
        <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Recuperación de contraseña</h3></div>
                                    <div className="card-body">
                                        <div className="small mb-3 text-muted">Ingrese su dirección de correo electrónico y le enviaremos un enlace para restablecer su contraseña.</div>
                                        <form>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" id="inputEmail" type="email" placeholder="name@example.com" />
                                                <label htmlFor="inputEmail">Dirección de correo electrónico</label>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <NavLink to="/login" className="small">Volver a iniciar sesión</NavLink>
                                                <NavLink to="/login" className="btn btn-primary">Restablecer la contraseña</NavLink>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center py-3">
                                        <div className="small">
                                            <Link to="/register">¿Necesita una cuenta? ¡Inscribete!</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    )
}

export default RecoveryPwd
