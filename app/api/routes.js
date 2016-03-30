var express = require('express');
var router = express.Router();
var fs = require('fs');
// var middleware = require('../middlewares/middleware');
var jwt = require('express-jwt');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var auth = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload'
});
var controllers = {},
	controllers_path = process.cwd() + '/app/controllers';

fs.readdirSync(controllers_path).forEach(function (file){
	if(file.indexOf('.js') != -1){
		controllers[file.split('.')[0]] = require(controllers_path + '/' + file)
	}
})

var routesController = function(server){

	//Pais
	server.get("/pais/get/all", auth, controllers.pais.getPaises);
	server.get("/pais/get/:id", auth, controllers.pais.getPais);
	server.post("/pais/post", auth, controllers.pais.postPais);
	server.post("/pais/upload/flag", multipartMiddleware, controllers.pais.uploadAvatar);
	server.put("/pais/put/:id", auth, controllers.pais.putPais);
	server.put("/pais/delete/:id", auth, controllers.pais.deletePais);

	//Tipos de Equipo
	server.get("/tipoEquipo/get/all", auth, controllers.tipoEquipo.getTiposEquipo);
	server.get("/tipoEquipo/get/:id", auth, controllers.tipoEquipo.getTipoEquipo);
	server.post("/tipoEquipo/post", auth, controllers.tipoEquipo.postTipoEquipo);
	server.put("/tipoEquipo/put/:id", auth, controllers.tipoEquipo.putTipoEquipo);
	server.put("/tipoEquipo/delete/:id", auth, controllers.tipoEquipo.deleteTipoEquipo);

	//Estados equipo
	server.get("/estadoEquipo/get/all", auth, controllers.estadoEquipo.getEstadosEquipo);
	server.get("/estadoEquipo/get/:id", auth, controllers.estadoEquipo.getEstadoEquipo);
	server.post("/estadoEquipo/post", auth, controllers.estadoEquipo.postEstadoEquipo);
	server.put("/estadoEquipo/put/:id", auth, controllers.estadoEquipo.putEstadoEquipo);
	server.put("/estadoEquipo/delete/:id", auth, controllers.estadoEquipo.deleteEstadoEquipo);

	//Estados Empleado
	server.get("/estadoEmpleado/get/all", auth, controllers.estadoEmpleado.getEstadosEmpleado);
	server.get("/estadoEmpleado/get/:id", auth, controllers.estadoEmpleado.getEstadoEmpleado);
	server.post("/estadoEmpleado/post", auth, controllers.estadoEmpleado.postEstadoEmpleado);
	server.put("/estadoEmpleado/put/:id", auth, controllers.estadoEmpleado.putEstadoEmpleado);
	server.put("/estadoEmpleado/delete/:id", auth, controllers.estadoEmpleado.deleteEstadoEmpleado);

	//Tipos de Empleado
	server.get("/tipoEmpleado/get/all", auth, controllers.tipoEmpleado.getTiposEmpleado);
	server.get("/tipoEmpleado/get/:id", auth, controllers.tipoEmpleado.getTipoEmpleado);
	server.post("/tipoEmpleado/post", auth, controllers.tipoEmpleado.postTipoEmpleado);
	server.put("/tipoEmpleado/put/:id", auth, controllers.tipoEmpleado.putTipoEmpleado);
	server.put("/tipoEmpleado/delete/:id", auth, controllers.tipoEmpleado.deleteTipoEmpleado);

	//Tipos de Usuario
	server.get("/tipoUsuario/get/all", auth, controllers.tipoUsuario.getTiposUsuario);
	server.get("/tipoUsuario/get/:id", auth, controllers.tipoUsuario.getTipoUsuario);
	server.post("/tipoUsuario/post", auth, controllers.tipoUsuario.postTipoUsuario);
	server.put("/tipoUsuario/put/:id", auth, controllers.tipoUsuario.putTipoUsuario);
	server.put("/tipoUsuario/delete/:id", auth, controllers.tipoUsuario.deleteTipoUsuario);

	//Moneda Pais
	server.get("/monedaPais/get/all", auth, controllers.monedaPais.getMonedasPais);
	server.get("/monedaPais/get/:id", auth, controllers.monedaPais.getMonedaPais);
	server.post("/monedaPais/post", auth, controllers.monedaPais.postMonedaPais);
	server.put("/monedaPais/put/:id", auth, controllers.monedaPais.putMonedaPais);
	server.put("/monedaPais/delete/:id", auth, controllers.monedaPais.deleteMonedaPais);

	//Roles
	server.get("/rol/get/all", auth, controllers.rol.getRoles);
	server.get("/rol/get/:id", auth, controllers.rol.getRol);
	server.post("/rol/post", auth, controllers.rol.postRol);
	server.put("/rol/put/:id", auth, controllers.rol.putRol);
	server.put("/rol/delete/:id", auth, controllers.rol.deleteRol);

	//Paginas
	server.get("/pagina/get/all", auth, controllers.pagina.getPaginas);
	server.get("/pagina/get/:id", auth, controllers.pagina.getPagina);
	server.post("/pagina/post", auth, controllers.pagina.postPagina);
	server.put("/pagina/put/:id", auth, controllers.pagina.putPagina);
	server.put("/pagina/delete/:id", auth, controllers.pagina.deletePagina);

	//Modulos
	server.get("/modulo/get/all", auth, controllers.modulo.getModulos);
	server.get("/modulo/get/:id", auth, controllers.modulo.getModulo);
	server.post("/modulo/post", auth, controllers.modulo.postModulo);
	server.put("/modulo/put/:id", auth, controllers.modulo.putModulo);
	server.put("/modulo/delete/:id", auth, controllers.modulo.deleteModulo);

	//Tipos de Credito
	server.get("/tipoCredito/get/all", auth, controllers.tipoCredito.getTiposCredito);
	server.get("/tipoCredito/get/:id", auth, controllers.tipoCredito.getTipoCredito);
	server.post("/tipoCredito/post", auth, controllers.tipoCredito.postTipoCredito);
	server.put("/tipoCredito/put/:id", auth, controllers.tipoCredito.putTipoCredito);
	server.put("/tipoCredito/delete/:id", auth, controllers.tipoCredito.deleteTipoCredito);

	//Tipos de Pago
	server.get("/tipoPago/get/all", auth, controllers.tipoPago.getTiposPago);
	server.get("/tipoPago/get/:id", auth, controllers.tipoPago.getTipoPago);
	server.post("/tipoPago/post", auth, controllers.tipoPago.postTipoPago);
	server.put("/tipoPago/put/:id", auth, controllers.tipoPago.putTipoPago);
	server.put("/tipoPago/delete/:id", auth, controllers.tipoPago.deleteTipoPago);

	//Tipos de Cliente
	server.get("/tipoCliente/get/all", auth, controllers.tipoCliente.getTiposCliente);
	server.get("/tipoCliente/get/:id", auth, controllers.tipoCliente.getTipoCliente);
	server.post("/tipoCliente/post", auth, controllers.tipoCliente.postTipoCliente);
	server.put("/tipoCliente/put/:id", auth, controllers.tipoCliente.putTipoCliente);
	server.put("/tipoCliente/delete/:id", auth, controllers.tipoCliente.deleteTipoCliente);

	//Tipos de Alquiler
	server.get("/tipoAlquiler/get/all", auth, controllers.tipoAlquiler.getTiposAlquiler);
	server.get("/tipoAlquiler/get/:id", auth, controllers.tipoAlquiler.getTipoAlquiler);
	server.post("/tipoAlquiler/post", auth, controllers.tipoAlquiler.postTipoAlquiler);
	server.put("/tipoAlquiler/put/:id", auth, controllers.tipoAlquiler.putTipoAlquiler);
	server.put("/tipoAlquiler/delete/:id", auth, controllers.tipoAlquiler.deleteTipoAlquiler);

	//Usuarios
	server.get("/usuario/get/all", auth, controllers.usuario.getUsuarios);
	server.get("/usuario/get/:id", auth, controllers.usuario.getUsuario);
	server.post("/usuario/post", auth, controllers.usuario.postUsuario);
	server.put("/usuario/delete/:id", auth, controllers.usuario.deleteUsuario);
	server.post("/login/user", controllers.usuario.loginUser);

	//Empleados
	server.get("/empleado/get/all/:sedeId", auth, controllers.empleado.getEmpleados);
	server.get("/empleado/get/:id", auth, controllers.empleado.getEmpleado);
	server.post("/empleado/post", auth, controllers.empleado.postEmpleado);
	server.put("/empleado/put/:id", auth, controllers.empleado.putEmpleado);
	server.put("/empleado/delete/:id", auth, controllers.empleado.deleteEmpleado);
	server.post("/empleado/upload/avatar", multipartMiddleware, controllers.empleado.uploadAvatar);
	//empleados suspendidos
	server.get("/empleado/suspendido/get/:sedeId", auth, controllers.empleado.getEmpleadosSuspendidos);
	server.post("/empleado/suspendido/post/:EmpleadoId", auth, controllers.empleado.postEmpleadoSuspendido);
	server.put("/empleado/suspendido/put/:EmpleadoId", auth, controllers.empleado.putEmpleadoSuspendido);
	//empleados vacaciones
	server.get("/empleado/vacaciones/get/:sedeId", auth, controllers.empleado.getEmpleadosVacaciones);
	server.post("/empleado/vacaciones/post/:EmpleadoId", auth, controllers.empleado.postEmpleadoVacaciones);
	server.put("/empleado/vacaciones/put/:EmpleadoId", auth, controllers.empleado.putEmpleadoVacaciones);

	//Clientes
	server.get("/cliente/get/all/:sedeId", auth, controllers.cliente.getClientes);
	server.get("/cliente/get/:id/:sedeId", auth, controllers.cliente.getCliente);
	server.post("/cliente/post", auth, controllers.cliente.postCliente);
	server.put("/cliente/put/:id", auth, controllers.cliente.putCliente);
	server.put("/cliente/delete/:id", auth, controllers.cliente.deleteCliente);

	//Tractores
	server.get("/tractor/get/all/:sedeId", auth, controllers.tractor.getTractores);
	server.get("/tractor/get/:id/:sedeId", auth, controllers.tractor.getTractor);
	server.post("/tractor/post", auth, controllers.tractor.postTractor);
	server.put("/tractor/put/:id", auth, controllers.tractor.putTractor);
	server.put("/tractor/delete/:id", auth, controllers.tractor.deleteTractor);
	server.post("/tractor/upload/avatar", multipartMiddleware, controllers.tractor.uploadAvatar);

	//Precios de Equipo
	server.get("/precioEquipo/get/all", auth, controllers.precioEquipo.getPreciosEquipo);
	server.get("/precioEquipo/get/:id", auth, controllers.precioEquipo.getPrecioEquipo);
	server.post("/precioEquipo/post", auth, controllers.precioEquipo.postPrecioEquipo);
	server.put("/precioEquipo/put/:id", auth, controllers.precioEquipo.putPrecioEquipo);
	server.put("/precioEquipo/delete/:id", auth, controllers.precioEquipo.deletePrecioEquipo);

	//Reservas
	server.get("/reserva/get/all/:SedeId", auth, controllers.reserva.getReservas);
	server.get("/reserva/get/:id", auth, controllers.reserva.getReserva);
	server.get("/reserva/detalle/get/:id", auth, controllers.reserva.getDetalleReserva);
	server.post("/reserva/post", auth, controllers.reserva.postReserva);
	server.post("/reserva/detalle/post", auth, controllers.reserva.postReservaDetalle);
	server.put("/reserva/put/:id", auth, controllers.reserva.putReserva);
	server.put("/reserva/delete/:id", auth, controllers.reserva.deleteReserva);
	server.put("/reserva/detalle/delete/:id", auth, controllers.reserva.deleteDetalleReserva);

	//Sedes
	server.get("/sede/get/all", auth, controllers.sede.getSedes);
	server.get("/sede/get/:id", auth, controllers.sede.getSede);
	server.post("/sede/post", auth, controllers.sede.postSede);
	server.put("/sede/put/:id", auth, controllers.sede.putSede);
	server.put("/sede/delete/:id", auth, controllers.sede.deleteSede);

	//payProtections
	server.get("/payProtection/get/all", auth, controllers.payProtection.getPaysProtection);
	server.get("/payProtection/get/:id", auth, controllers.payProtection.getPayProtection);
	server.post("/payProtection/post", auth, controllers.payProtection.postPayProtection);
	server.put("/payProtection/put/:id", auth, controllers.payProtection.putPayProtection);
	server.put("/payProtection/delete/:id", auth, controllers.payProtection.deletePayProtection);

	//Facturas
	server.get("/factura/get/all/:SedeId", auth, controllers.factura.getFacturas);
	server.get("/factura/get/:id", auth, controllers.factura.getFactura);
	server.get("/factura/detalle/:id", auth, controllers.factura.getDetalleFactura);
	server.post("/factura/post", auth, controllers.factura.postFactura);
	server.put("/factura/delete/:id", auth, controllers.factura.deleteFactura);	
}

module.exports = routesController;