import React from "react";
import { useUser } from "../../context/userContext";
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({roleList,children})=> {
    //const[user,setUser] = useUser();

    //console.log(user);
    const {user,isAuthenticated,isLoading} = useAuth0();

    const userRole  ="admin";
    console.log(user,isAuthenticated,isLoading);

    /*if(roleList.includes(userRole)){
        return children;
    }*/
    if(isLoading){
        return <div>loading...</div>;
    }
    
    if(isAuthenticated){
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