import Express from "express";

const rutasProducto = Express.Router();

const genercCallback = (res) => (err, result) => {
  if (err) {
    console.log('error', err);
    res.status(500).json({ error: err });
  } else {
    res.json(result);
  }
};

rutasProducto.route('/productos').get((req, res) => {
    console.log('alguien hizo get en la ruta /vehiculos');
    //queryAllVehicles(genercCallback(res));
    const productos =[
        {codigo:"001",nombre:"Portatil"},
        {codigo:"002",nombre:"Lapiz"}
    ];
    res.send(productos);
  });
  
  rutasProducto.route('/productos').post((req, res) => {
    const producto = req.body;
    //console.log(Object.keys(producto));
    //https://simonplend.com/how-to-handle-request-validation-in-your-express-api/
    if(Object.keys(producto).includes('id') &&
        Object.keys(producto).includes('name') &&
        Object.keys(producto).includes('price')){
        res.sendStatus(200);
    }else{
        res.sendStatus(500);
    }

    
  });
  
  rutasProducto.route('/vehiculos/:id').get((req, res) => {
    console.log('alguien hizo get en la ruta /vehiculos');
    //consultarVehiculo(req.params.id, genercCallback(res));
    res.send("OK");
  });

  export default rutasProducto;