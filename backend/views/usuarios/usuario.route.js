import Express from "express";

const rutasUsuario = Express.Router();

const genercCallback = (res) => (err, result) => {
    if (err) {
      res.status(500).send('Error consultando los usuarios');
    } else {
      res.json(result);
    }
  };

  rutasUsuario.route('/usuarios').get((req, res) => {
    
    const usuarios =[
        {id:"001",firstName:"Ronald",lastName:"Cuello",email:"admin@yopmail.com",role:"admin"},
        {id:"002",firstName:"Alejandro",lastName:"Nagno",email:"magnus@yopmail.com",role:"vendedor"},
        {id:"003",firstName:"Marco",lastName:"Polo",email:"marco@yopmail.com",role:"vendedor"},
        {id:"004",firstName:"Cleopatra",lastName:"Egito",email:"cleo@yopmail.com",role:"admin"}
    ];

    res.send(usuarios);

  });

  rutasUsuario.route('/usuarios').post((req, res) => {
    //crearUsuario(req.body, genercCallback(res));
    var jsonBody = req.body;
    console.log(jsonBody);
    res.send("OK");
  });

  rutasUsuario.route('/usuarios/:id').get((req, res) => {
    console.log('alguien hizo get en la ruta /usuarios');
    res.send("OK");
    //consultarUsuario(req.params.id, genercCallback(res));
  });

  rutasUsuario.route('/usuarios/:id').patch((req, res) => {
    var id = req.params.id;
    //editarUsuario(req.params.id, req.body, genercCallback(res));
    res.send("OK");
  });

  export default rutasUsuario;