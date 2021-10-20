// hacer el import de express tradicional
// const express = require('express');

//Para que funcione esta forma 
//Modificar package.json => "type": "module",
import Express, { json } from 'express';
import Cors from 'cors';
import dotenv from 'dotenv';

import rutasUsuario from "./views/usuarios/rutas.js";
import rutasProducto from "./views/productos/rutas.js";
import rutasVenta from "./views/ventas/rutas.js";


dotenv.config({ path: './.env' });

const app = Express();

app.use(Express.json());
app.use(Cors());


/*
Activar NodeMon
"scripts": {
    "start": "nodemon server.js",
*/
//https://github.com/ariza394?tab=overview&from=2021-09-01&to=2021-09-30



// ROUTES
// ==============================================
app.use(rutasUsuario);
app.use(rutasProducto);
app.use(rutasVenta);
/*
CLase 19 de Daniel Saldarriaga (Clase con NodeJs Backend)
*/

// START THE SERVER
// ==============================================
const port = process.env.PORT || 5000;
app.listen(port,function()
{
    //ALT + 96 => Comilla francesa
    console.log(`Escuchando puerto ${port}`);
});