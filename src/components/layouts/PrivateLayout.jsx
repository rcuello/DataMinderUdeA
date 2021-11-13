import React,{ useEffect, useState } from "react";
import Header from "../header/Header";
import SideBar from "../sideBar/SideBar";

import { useUser } from "../../context/userContext";
import { useAuth0 } from "@auth0/auth0-react";
import { obtenerDatosUsuario } from '../../utils/api.jsx';
import ReactLoading from 'react-loading';

const PrivateLayout = ({children}) => {
    const { setUserData } = useUser();
    const {user,isAuthenticated,isLoading,getAccessTokenSilently,logout,loginWithRedirect } = useAuth0();
    const [loadingUserInformation, setLoadingUserInformation] = useState(false);

    //const userRole  ="admin";
    //console.log(user,isAuthenticated,isLoading);

    useEffect(() => {
        // 1. pedir token a auth0
        const fetchAuth0Token = async ()=>{

            setLoadingUserInformation(true);

            const accessToken = await getAccessTokenSilently({
                audience:`api-autenticacion-dataminder-mintic`
            });
            // 2. recibir token de auth0
            localStorage.setItem('token', accessToken);


            console.log(accessToken);

            // 3. enviarle el token a el backend
            await obtenerDatosUsuario(
                (response) => {
                  //console.log('response con datos del usuario', response);
                  setUserData(response.data);
                  setLoadingUserInformation(false);

                  /*if(response.data.estado==="rechazado"){
                    logout({ returnTo: 'http://localhost:3000/login' });
                  }*/
                },
                (err) => {
                  console.log('err', err);
                  setLoadingUserInformation(false);
                  console.log("redirect");
                  logout(/*{ returnTo: 'http://localhost:3000/login' }*/);
                }
            );
        }

        if(isAuthenticated){
            fetchAuth0Token();
        }
        
    }, [isAuthenticated, getAccessTokenSilently])
    
    if (isLoading || loadingUserInformation){
        return <ReactLoading type='spin' color='#000000'  />;
    }

    if (!isAuthenticated) {
        return loginWithRedirect();
    }

    return (
        <div className="sb-nav-fixed">
            
            <Header />

            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <SideBar/>
                </div>
                <div id="layoutSidenav_content">
                    <main>
                        {children}
                    </main>
                </div>
            </div>
        </div>
    )
}

export default PrivateLayout;
