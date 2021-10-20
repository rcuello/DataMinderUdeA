import React from 'react';

const Sales = () => {
    

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
                    <table id="datatablesSimple" className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>#Venta</th>
                                <th>Vendedor</th>
                                <th>Comprador</th>
                                <th>Total venta</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>FAC01</td>
                                <td>admin</td>
                                <td>Julio Verne</td>
                                <td>$320,800</td>
                            </tr>
                            <tr>
                                <td>FAC02</td>
                                <td>ventas</td>
                                <td>Marco Polo</td>
                                <td>$120,800</td>
                            </tr>
                            <tr>
                                <td>FAC03</td>
                                <td>nixon</td>
                                <td>Carlo Magno</td>
                                <td>$520,800</td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Sales
