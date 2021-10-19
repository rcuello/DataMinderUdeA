import React from "react";

const PrivateRoute = ({roleList,children})=> {
    const userRole  ="admin";

    if(roleList.includes(userRole)){
        return children;
    }

    return (
        <div class="alert alert-danger" role="alert">
            No estás autorizado para ver este sitio.
        </div>
    )
}

export default PrivateRoute;