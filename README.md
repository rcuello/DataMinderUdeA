¿Qué debo alcanzar para desarrollar la aplicación web?
=================================
Para que puedas desarrollar el proyecto que se te planteó, la aplicación web debe
contar con los siguientes módulos:

Módulo administrador de ventas
--------
Permite ingresar o registrar los pedidos  realizados por cada uno de los clientes. Deberá tener un identificador único de venta, almacenar el valor total de la venta y la descripción detallada de la  misma y tener una fecha inicial y una fecha futura de pago. Además, deberá  contar con un encargado de gestionar dicha venta (responsable).
 
Módulo para registrar el estado de la venta
--------
Permite establecer los
diferentes estados de la venta a lo largo del ciclo de vida de la línea de producción (creación, embalaje, despacho, ruta, ubicación, recepción).  
 
Gestión de vendedores.
--------
Permite ingresar la información básica de los vendedores que participan en un negocio de ventas. La información a registrar sería el identificador único del vendedor, el nombre, la especialidad, el número de celular y la fecha de ingreso.

Gestión de vendedores
--------
El sistema contendrá una  pantalla de ingreso con login y password.
Este módulo hará la integración de los demás módulos del sistema para  garantizar que los roles de los usuarios se ajusten a las distintas opciones de  cada menú o formulario. Se contempla la identificación y el desarrollo de los  casos de uso relacionados con la seguridad, así como el análisis de requisitos  y el diseño del módulo.

Gestión de usuarios y roles
--------
Deberá contener un identificador único del  usuario, el nombre y el rol en el sistema de información (vendedor, administrador, ejecutivo, operario, director, gerente comercial) con el fin de restringir/otorgar accesos al sistema de información.


Recursos del Proyecto
=================

  * [Trello.com](https://trello.com/b/FCTei02J/scrum-board) — Gestión del proyecto usando Kanban
  * [GitHub.com](https://github.com/rcuello/DataMinderUdeA) — Repositorio del codigo fuente
  
Recursos para el Desarrollo
=================

  * [code.visualstudio.com](https://code.visualstudio.com/) — IDE del proyecto
  * [Git-scm.com](https://git-scm.com/downloads) — GIT
  * [nodejs.org](https://nodejs.org/es/download/) — NodeJs
  * [mongodb.com]( https://www.mongodb.com/es/cloud/atlas) — mongodb
  * [Sprint 1 y 2 Tutor Alejandro Mesa](https://udea.zoom.us/rec/play/lcjLw09rRTHmbRro19KA2aZMbsE9kVEefOtAC3oDbuVCdRF3wefVkkxing5TdHEmVCLXaUeyKGYM1JYe.F-o2txRJHLQlzeCB?startTime=1632070269000&_x_zm_rtaid=86XmYX8ERYOJnEVDFtA95g.1633449325176.b59b7b4097c51ffc32374c93b8c31f9a&_x_zm_rhtaid=698) — Tutor Alejandro Mesa
  * [Repo Tutor Alejandro Mesa](https://github.com/pharaohghost7/Sprint1) — Tutor Alejandro Mesa
  * [Repo Tutor David Torres](https://github.com/deivid-01) — Tutor Nivelatorio Deivid Torres
  
  
Pasos para crear la base de datos en Mongodb.com
=================
 * Ingresar a [mongodb.com]( https://www.mongodb.com/es/cloud/atlas) — mongodb
 * Opcion "Build database"
 * Opcion => Deploy a cloud database => Shared (Free)
 * Opcion => Create
 * Opcion => Cloud Provider & Region => Azure , Azure, Virginia-East2 (eastus2)
 * Opcion => Cluster Name => Group-mintic
 * Opcion => Create Cluster



Informacion sobre el sprint
=================
https://udea.zoom.us/rec/play/lcjLw09rRTHmbRro19KA2aZMbsE9kVEefOtAC3oDbuVCdRF3wefVkkxing5TdHEmVCLXaUeyKGYM1JYe.F-o2txRJHLQlzeCB?startTime=1632070269000&_x_zm_rtaid=86XmYX8ERYOJnEVDFtA95g.1633449325176.b59b7b4097c51ffc32374c93b8c31f9a&_x_zm_rhtaid=698


Instalaciones Necesarias
=================
1. (mkdir) Crear Carpeta "backed"
2. (cmd) => cd backend
3. (cmd) => npm init
4. (cmd) => npm install express morgan mongoose
5. (cmd) => npm install nodemon -D


Node => npm install -g create-react-app