import React from "react";
import { useUser } from "../../context/userContext";

const PrivateRoute = ({roleList,children})=> {
    //const[user,setUser] = useUser();

    //console.log(user);
    

    const userRole  ="admin";

    if(roleList.includes(userRole)){
        return children;
    }

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Acceso restringido</h1>
            <div class="mb-4">
                <div class="alert alert-danger" role="alert">
                    No estás autorizado para ver este sitio.
                </div>
            </div>
        </div>
        
    )
}

export default PrivateRoute;