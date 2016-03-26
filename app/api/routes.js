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
	server.get("/pais/get/all", controllers.pais.getPaises);
	server.get("/pais/get/:id", controllers.pais.getPais);
	server.post("/pais/post", controllers.pais.postPais);
	server.put("/pais/put/:id", controllers.pais.putPais);
	server.put("/pais/delete/:id", controllers.pais.deletePais);

	//Tipos de Equipo
	server.get("/tipoEquipo/get/all", controllers.tipoEquipo.getTiposEquipo);
	server.get("/tipoEquipo/get/:id", controllers.tipoEquipo.getTipoEquipo);
	server.post("/tipoEquipo/post", controllers.tipoEquipo.postTipoEquipo);
	server.put("/tipoEquipo/put/:id", controllers.tipoEquipo.putTipoEquipo);
	server.put("/tipoEquipo/delete/:id", controllers.tipoEquipo.deleteTipoEquipo);

	//Estados equipo
	server.get("/estadoEquipo/get/all", controllers.estadoEquipo.getEstadosEquipo);
	server.get("/estadoEquipo/get/:id", controllers.estadoEquipo.getEstadoEquipo);
	server.post("/estadoEquipo/post", controllers.estadoEquipo.postEstadoEquipo);
	server.put("/estadoEquipo/put/:id", controllers.estadoEquipo.putEstadoEquipo);
	server.put("/estadoEquipo/delete/:id", controllers.estadoEquipo.deleteEstadoEquipo);

	//Estados Empleado
	server.get("/estadoEmpleado/get/all", controllers.estadoEmpleado.getEstadosEmpleado);
	server.get("/estadoEmpleado/get/:id", controllers.estadoEmpleado.getEstadoEmpleado);
	server.post("/estadoEmpleado/post", controllers.estadoEmpleado.postEstadoEmpleado);
	server.put("/estadoEmpleado/put/:id", controllers.estadoEmpleado.putEstadoEmpleado);
	server.put("/estadoEmpleado/delete/:id", controllers.estadoEmpleado.deleteEstadoEmpleado);

	//Tipos de Empleado
	server.get("/tipoEmpleado/get/all", controllers.tipoEmpleado.getTiposEmpleado);
	server.get("/tipoEmpleado/get/:id", controllers.tipoEmpleado.getTipoEmpleado);
	server.post("/tipoEmpleado/post", controllers.tipoEmpleado.postTipoEmpleado);
	server.put("/tipoEmpleado/put/:id", controllers.tipoEmpleado.putTipoEmpleado);
	server.put("/tipoEmpleado/delete/:id", controllers.tipoEmpleado.deleteTipoEmpleado);

	//Tipos de Usuario
	server.get("/tipoUsuario/get/all", controllers.tipoUsuario.getTiposUsuario);
	server.get("/tipoUsuario/get/:id", controllers.tipoUsuario.getTipoUsuario);
	server.post("/tipoUsuario/post", controllers.tipoUsuario.postTipoUsuario);
	server.put("/tipoUsuario/put/:id", controllers.tipoUsuario.putTipoUsuario);
	server.put("/tipoUsuario/delete/:id", controllers.tipoUsuario.deleteTipoUsuario);

	//Moneda Pais
	server.get("/monedaPais/get/all", controllers.monedaPais.getMonedasPais);
	server.get("/monedaPais/get/:id", controllers.monedaPais.getMonedaPais);
	server.post("/monedaPais/post", controllers.monedaPais.postMonedaPais);
	server.put("/monedaPais/put/:id", controllers.monedaPais.putMonedaPais);
	server.put("/monedaPais/delete/:id", controllers.monedaPais.deleteMonedaPais);

	//Roles
	server.get("/rol/get/all", controllers.rol.getRoles);
	server.get("/rol/get/:id", controllers.rol.getRol);
	server.post("/rol/post", controllers.rol.postRol);
	server.put("/rol/put/:id", controllers.rol.putRol);
	server.put("/rol/delete/:id", controllers.rol.deleteRol);

	//Paginas
	server.get("/pagina/get/all", controllers.pagina.getPaginas);
	server.get("/pagina/get/:id", controllers.pagina.getPagina);
	server.post("/pagina/post", controllers.pagina.postPagina);
	server.put("/pagina/put/:id", controllers.pagina.putPagina);
	server.put("/pagina/delete/:id", controllers.pagina.deletePagina);

	//Modulos
	server.get("/modulo/get/all", controllers.modulo.getModulos);
	server.get("/modulo/get/:id", controllers.modulo.getModulo);
	server.post("/modulo/post", controllers.modulo.postModulo);
	server.put("/modulo/put/:id", controllers.modulo.putModulo);
	server.put("/modulo/delete/:id", controllers.modulo.deleteModulo);

	//Tipos de Credito
	server.get("/tipoCredito/get/all", controllers.tipoCredito.getTiposCredito);
	server.get("/tipoCredito/get/:id", controllers.tipoCredito.getTipoCredito);
	server.post("/tipoCredito/post", controllers.tipoCredito.postTipoCredito);
	server.put("/tipoCredito/put/:id", controllers.tipoCredito.putTipoCredito);
	server.put("/tipoCredito/delete/:id", controllers.tipoCredito.deleteTipoCredito);

	//Tipos de Pago
	server.get("/tipoPago/get/all", controllers.tipoPago.getTiposPago);
	server.get("/tipoPago/get/:id", controllers.tipoPago.getTipoPago);
	server.post("/tipoPago/post", controllers.tipoPago.postTipoPago);
	server.put("/tipoPago/put/:id", controllers.tipoPago.putTipoPago);
	server.put("/tipoPago/delete/:id", controllers.tipoPago.deleteTipoPago);

	//Tipos de Cliente
	server.get("/tipoCliente/get/all", controllers.tipoCliente.getTiposCliente);
	server.get("/tipoCliente/get/:id", controllers.tipoCliente.getTipoCliente);
	server.post("/tipoCliente/post", controllers.tipoCliente.postTipoCliente);
	server.put("/tipoCliente/put/:id", controllers.tipoCliente.putTipoCliente);
	server.put("/tipoCliente/delete/:id", controllers.tipoCliente.deleteTipoCliente);

	//Tipos de Alquiler
	server.get("/tipoAlquiler/get/all", controllers.tipoAlquiler.getTiposAlquiler);
	server.get("/tipoAlquiler/get/:id", controllers.tipoAlquiler.getTipoAlquiler);
	server.post("/tipoAlquiler/post", controllers.tipoAlquiler.postTipoAlquiler);
	server.put("/tipoAlquiler/put/:id", controllers.tipoAlquiler.putTipoAlquiler);
	server.put("/tipoAlquiler/delete/:id", controllers.tipoAlquiler.deleteTipoAlquiler);

	//Usuarios
	server.get("/usuario/get/all", controllers.usuario.getUsuarios);
	server.get("/usuario/get/:id", controllers.usuario.getUsuario);
	server.post("/usuario/post", controllers.usuario.postUsuario);
	server.put("/usuario/delete/:id", controllers.usuario.deleteUsuario);
	server.post("/login/user", controllers.usuario.loginUser);

	//Empleados
	server.get("/empleado/get/all/:sedeId", controllers.empleado.getEmpleados);
	server.get("/empleado/get/:id/:sedeId", controllers.empleado.getEmpleado);
	server.post("/empleado/post", controllers.empleado.postEmpleado);
	server.put("/empleado/put/:id", controllers.empleado.putEmpleado);
	server.put("/empleado/delete/:id", controllers.empleado.deleteEmpleado);
	server.post("/empleado/upload/avatar", controllers.empleado.uploadAvatar);
	//empleados suspendidos
	server.get("/empleado/suspendido/get/:sedeId", controllers.empleado.getEmpleadosSuspendidos);
	server.post("/empleado/suspendido/post/:EmpleadoId", controllers.empleado.postEmpleadoSuspendido);
	server.put("/empleado/suspendido/put/:EmpleadoId", controllers.empleado.putEmpleadoSuspendido);
	//empleados vacaciones
	server.get("/empleado/vacaciones/get/:sedeId", controllers.empleado.getEmpleadosVacaciones);
	server.post("/empleado/vacaciones/post/:EmpleadoId", controllers.empleado.postEmpleadoVacaciones);
	server.put("/empleado/vacaciones/put/:EmpleadoId", controllers.empleado.putEmpleadoVacaciones);

	//Clientes
	server.get("/cliente/get/all/:sedeId", controllers.cliente.getClientes);
	server.get("/cliente/get/:id/:sedeId", controllers.cliente.getCliente);
	server.post("/cliente/post", controllers.cliente.postCliente);
	server.put("/cliente/put/:id", controllers.cliente.putCliente);
	server.put("/cliente/delete/:id", controllers.cliente.deleteCliente);

	//Tractores
	server.get("/tractor/get/all/:sedeId", controllers.tractor.getTractores);
	server.get("/tractor/get/:id/:sedeId", controllers.tractor.getTractor);
	server.post("/tractor/post", controllers.tractor.postTractor);
	server.put("/tractor/put/:id", controllers.tractor.putTractor);
	server.put("/tractor/delete/:id", controllers.tractor.deleteTractor);
	server.post("/tractor/upload/avatar", controllers.tractor.uploadAvatar);

	//Precios de Equipo
	server.get("/precioEquipo/get/all", controllers.precioEquipo.getPreciosEquipo);
	server.get("/precioEquipo/get/:id", controllers.precioEquipo.getPrecioEquipo);
	server.post("/precioEquipo/post", controllers.precioEquipo.postPrecioEquipo);
	server.put("/precioEquipo/put/:id", controllers.precioEquipo.putPrecioEquipo);
	server.put("/precioEquipo/delete/:id", controllers.precioEquipo.deletePrecioEquipo);

	//Reservas
	server.get("/reserva/get/all/:SedeId", controllers.reserva.getReservas);
	server.get("/reserva/get/:id", controllers.reserva.getReserva);
	server.get("/reserva/detalle/get/:id", controllers.reserva.getDetalleReserva);
	server.post("/reserva/post", controllers.reserva.postReserva);
	server.post("/reserva/detalle/post", controllers.reserva.postReservaDetalle);
	server.put("/reserva/put/:id", controllers.reserva.putReserva);
	server.put("/reserva/delete/:id", controllers.reserva.deleteReserva);
	server.put("/reserva/detalle/delete/:id", controllers.reserva.deleteDetalleReserva);

	//Sedes
	server.get("/sede/get/all", controllers.sede.getSedes);
	server.get("/sede/get/:id", controllers.sede.getSede);
	server.post("/sede/post", controllers.sede.postSede);
	server.put("/sede/put/:id", controllers.sede.putSede);
	server.put("/sede/delete/:id", controllers.sede.deleteSede);

	//payProtections
	server.get("/payProtection/get/all", controllers.payProtection.getPaysProtection);
	server.get("/payProtection/get/:id", controllers.payProtection.getPayProtection);
	server.post("/payProtection/post", controllers.payProtection.postPayProtection);
	server.put("/payProtection/put/:id", controllers.payProtection.putPayProtection);
	server.put("/payProtection/delete/:id", controllers.payProtection.deletePayProtection);

	//Facturas
	server.get("/factura/get/all/:SedeId", controllers.factura.getFacturas);
	server.get("/factura/get/:id", controllers.factura.getFactura);
	server.get("/factura/detalle/:id", controllers.factura.getDetalleFactura);
	server.post("/factura/post", controllers.factura.postFactura);
	server.put("/factura/delete/:id", controllers.factura.deleteFactura);	
}

module.exports = routesController;