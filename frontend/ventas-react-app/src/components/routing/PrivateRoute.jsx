import React,{ useEffect, useState } from "react";
import { useUser } from "../../context/userContext";
import { useAuth0 } from "@auth0/auth0-react";
import { obtenerDatosUsuario } from '../../utils/api.jsx';

const PrivateRoute = ({roleList,children})=> {
    //const[user,setUser] = useUser();

    //console.log(user);
    const { setUserData } = useUser();
    const {user,isAuthenticated,isLoading,getAccessTokenSilently,logout,loginWithRedirect } = useAuth0();
    const [loadingUserInformation, setLoadingUserInformation] = useState(false);

    const userRole  ="admin";
    console.log(user,isAuthenticated,isLoading);

    
    /*if(roleList.includes(userRole)){
        return children;
    }*/
    /*useEffect(() => {
        const fetchAuth0Token = async () => {
          // si se quieren hacer validaciones con el token:
          // if (localStorage.getItem('token')) {
          //   // validar fecha de expiracion del token
          // } else {
          //   // pedir token
          // }
           
          // 1. pedir token a auth0
          setLoadingUserInformation(true);
          const accessToken = await getAccessTokenSilently({
            audience: `api-autenticacion-dataminder-mintic`,
          });
          // 2. recibir token de auth0
          localStorage.setItem('token', accessToken);
          console.log(accessToken);
          // 3. enviarle el token a el backend
          await obtenerDatosUsuario(
            (response) => {
              console.log('response con datos del usuario', response);
              setUserData(response.data);
              setLoadingUserInformation(false);
            },
            (err) => {
              console.log('err', err);
              setLoadingUserInformation(false);
              logout({ returnTo: 'http://localhost:3000/admin' });
            }
          );
        };
        if (isAuthenticated) {
          fetchAuth0Token();
        }
      }, [isAuthenticated, getAccessTokenSilently, logout, setUserData]);*/



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