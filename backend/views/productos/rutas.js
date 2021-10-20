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
  
  rutasProducto.route('/vehiculos').post((req, res) => {
    //crearVehiculo(req.body, genercCallback(res));
    res.send("OK");
  });
  
  rutasProducto.route('/vehiculos/:id').get((req, res) => {
    console.log('alguien hizo get en la ruta /vehiculos');
    //consultarVehiculo(req.params.id, genercCallback(res));
    res.send("OK");
  });

  export default rutasProducto;