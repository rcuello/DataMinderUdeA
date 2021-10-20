import Express from "express";

const rutasVenta = Express();

const genercCallback = (res) => (err, result) => {
    if (err) {
      res.status(500).send('Error consultando los ventas');
    } else {
      res.json(result);
    }
  };

  rutasVenta.route('/ventas').get((req, res) => {
    console.log('alguien hizo get en la ruta /ventas');
    //queryAllSales(genercCallback(res));
    res.send("OK");
  });
  
  rutasVenta.route('/ventas').post((req, res) => {
    //crearVenta(req.body, genercCallback(res));
    res.send("OK");
  });
  
  rutasVenta.route('/ventas/:id').get((req, res) => {
    console.log('alguien hizo get en la ruta /ventas');
    //consultarVenta(req.params.id, genercCallback(res));
    res.send("OK");
  });
  
  rutasVenta.route('/ventas/:id').patch((req, res) => {
    //editarVenta(req.params.id, req.body, genercCallback(res));
  });
  
  rutasVenta.route('/ventas/:id').delete((req, res) => {
    //eliminarVenta(req.params.id, genercCallback(res));
  });

export default rutasVenta;