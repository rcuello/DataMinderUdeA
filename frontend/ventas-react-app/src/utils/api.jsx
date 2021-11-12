import axios from "axios";

const BASE_URL      = "http://localhost:3011";
//const PATH_USUARIOS = process.env.REACT_APP_PATH_USUARIOS;

const getToken = () => {
  return `Bearer ${localStorage.getItem('token')}`;
};

// CRUD Usuarios
// ==============================================
export const obtenerDatosUsuario = async (successCallback, errorCallback) => {
  const options = {
    method: 'GET',
    url: `${BASE_URL}/usuarios/self/`,
    headers: {
      Authorization: getToken(), // 3. enviarle el token a backend
    },
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const getUsuarios = async (successCallback, errorCallback) => {
    const url = `${BASE_URL}/usuarios`;
    const options = {
      method: 'GET',
      url: url
    };
   
    await axios.request(options).then(successCallback).catch(errorCallback);
  };

  export const createUsuario = async (data, successCallback, errorCallback) => {
    const options = {
      method: 'POST',
      url: `${BASE_URL}/usuarios`,
      headers: { 
          'Content-Type': 'application/json'
        },
      data,
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
  };

  export const deleteUsuario = async (id, successCallback, errorCallback) => {
    const options = {
      method: 'DELETE',
      url: `${BASE_URL}/usuarios/${id}`,
      headers: { 
          'Content-Type': 'application/json'
        }
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
  };

  export const findUsuarioById = async (id, successCallback, errorCallback) => {
    const options = {
      method: 'GET',
      url: `${BASE_URL}/usuarios/${id}`,
      headers: { 
          'Content-Type': 'application/json'
        },
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
  };

  export const updateUsuario = async (id,data, successCallback, errorCallback) => {
    const options = {
      method: 'PATCH',
      url: `${BASE_URL}/usuarios/${id}`,
      headers: { 
          'Content-Type': 'application/json'
        },
        data
    };
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

export const createProducto = async (data, successCallback, errorCallback) => {
    const options = {
      method: 'POST',
      url: `${BASE_URL}/productos`,
      headers: { 
          'Content-Type': 'application/json'
        },
      data,
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
  };

export const deleteProducto = async (id, successCallback, errorCallback) => {
    const options = {
      method: 'DELETE',
      url: `${BASE_URL}/productos/${id}`,
      headers: { 
          'Content-Type': 'application/json'
        }
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
  };

export const findProductoById = async (id, successCallback, errorCallback) => {
    const options = {
      method: 'GET',
      url: `${BASE_URL}/productos/${id}`,
      headers: { 
          'Content-Type': 'application/json'
        },
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
  };

  export const updateProducto = async (id,data, successCallback, errorCallback) => {
    const options = {
      method: 'PATCH',
      url: `${BASE_URL}/productos/${id}`,
      headers: { 
          'Content-Type': 'application/json'
        },
        data
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
  };

// CRUD VENTAS
// ==============================================
export const getVentas = async (successCallback, errorCallback) => {
    const url = `${BASE_URL}/ventas`;
    const options = {
      method: 'GET',
      url: url
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
  };

  export const createVenta = async (data, successCallback, errorCallback) => {
    const options = {
      method: 'POST',
      url: `${BASE_URL}/ventas`,
      headers: { 
          'Content-Type': 'application/json'
        },
      data,
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
  };