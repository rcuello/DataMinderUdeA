import axios from "axios";

const BASE_URL      = "http://localhost:3011";
//const PATH_USUARIOS = process.env.REACT_APP_PATH_USUARIOS;


// CRUD Usuarios
// ==============================================
export const getUsuarios = async (successCallback, errorCallback) => {
    const url = `${BASE_URL}/usuarios`;
    const options = {
      method: 'GET',
      url: url
    };
    /*const options = {
        method: 'GET',
        url: `${BASE_URL}/${PATH_USUARIOS}`,
        headers: {
            //"Content-Type":"application/json"
          Authorization: getToken(),
        },
      };*/
      //console.log("get:",url)
    await axios.request(options).then(successCallback).catch(errorCallback);
  };


// CRUD Productos
// ==============================================
export const getProductos = async (successCallback, errorCallback) => {
    const url = `${BASE_URL}/productos`;
    const options = {
      method: 'GET',
      url: url
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
  };

// CRUD Productos
// ==============================================
export const getVentas = async (successCallback, errorCallback) => {
    const url = `${BASE_URL}/ventas`;
    const options = {
      method: 'GET',
      url: url
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
  };