var models = require('../../models');
var service = require('../services/service');
var moment = require('moment');

exports.getPedidos = function(req, res){
	models.Reserva.findAll({
		where: {
			status: 1
		},
		attributes:['id','fechaReservacion','ClienteId', 'SedeId', 'estadoPedidoId','empleadoId'],
		include:[
			{
				model: models.Cliente,
				attributes: ['nombre','apellido', 'telefono', 'email'],
				where:{
					status: 1
				}
			},
			{
				model: models.Sede,
				attributes: ['descripcion','id'],
				where:{
					status: 1
				}
			},
			{
				model: models.estadoPedido,
				attributes: ['descripcion', 'id'],
				where:{
					status: 1
				}
			},
			{
				model: models.Empleado,
				attributes: ['nombre', 'apellido', 'id'],
				where: {
					status: 1
				}
			}
		]
	}).then(function (registros){
		if(!registros){
			service.sendJSONresponse(res, 500, {"type":false, "message": "error al obtener los registros", "data":registros});
		}else{
			service.sendJSONresponse(res,200, {"type":true, "data": registros});
		}
	})
};

exports.getPedidosBySede = function(req, res){
	models.Reserva.findAll({
		where: {
			status: 1,
			SedeId: req.params.SedeId
		},
		attributes:['id','fechaReservacion','ClienteId', 'SedeId', 'estadoPedidoId','empleadoId'],
		include:[
			{
				model: models.Cliente,
				attributes: ['nombre','apellido', 'telefono', 'email'],
				where:{
					status: 1
				}
			},
			{
				model: models.Sede,
				attributes: ['descripcion','id'],
				where:{
					status: 1
				}
			},
			{
				model: models.estadoPedido,
				attributes: ['descripcion', 'id'],
				where:{
					status: 1
				}
			},
			{
				model: models.Empleado,
				attributes: ['nombre', 'apellido', 'id'],
				where: {
					status: 1
				}
			}
		]
	}).then(function (registros){
		if(!registros){
			service.sendJSONresponse(res, 500, {"type":false, "message": "error al obtener los registros", "data":registros});
		}else{
			service.sendJSONresponse(res,200, {"type":true, "data": registros});
		}
	})
};

exports.getPedidosByEmpleado = function(req, res){
	models.Reserva.findAll({
		where: {
			status: 1,
			EmpleadoId: req.params.EmpleadoId
		},
		attributes:['id','fechaReservacion','ClienteId', 'SedeId', 'estadoPedidoId','empleadoId'],
		include:[
			{
				model: models.Cliente,
				attributes: ['nombre','apellido', 'telefono', 'email', 'id'],
				where:{
					status: 1
				}
			},
			{
				model: models.Sede,
				attributes: ['descripcion','id'],
				where:{
					status: 1
				}
			},
			{
				model: models.estadoPedido,
				attributes: ['descripcion', 'id'],
				where:{
					status: 1
				}
			},
			{
				model: models.Empleado,
				attributes: ['nombre', 'apellido', 'id'],
				where:{
					status: 1
				}
			}
		]
	}).then(function (registros){
		if(!registros){
			service.sendJSONresponse(res, 500, {"type":false, "message": "error al obtener los registros", "data":registros});
		}else{
			service.sendJSONresponse(res,200, {"type":true, "data": registros});
		}
	})
};

exports.getPedido = function(req, res){
	models.Reserva.findOne({
		where: {
			id: req.params.id,
			status: 1
		},
		attributes:['id','fechaReservacion','ClienteId', 'SedeId', 'estadoPedidoId','empleadoId'],
		include:[
			{
				model: models.Cliente,
				attributes: ['nombre','apellido', 'telefono', 'email'],
				where:{
					status: 1
				}
			},
			{
				model: models.SedeId,
				attributes: ['descripcion','id'],
				where:{
					status: 1
				}
			},
			{
				model: models.Empleado,
				attributes: ['nombre', 'apellido', 'id'],
				where: {
					status: 1
				}
			}
		]
	}).then(function (registro){
		if(!registro){
			service.sendJSONresponse(res,500, {"type":false, "message": "registro no encontrado", "data": registro});
		}else{
			service.sendJSONresponse(res,200, {"type":true, "data":registro});
		}
	})
};

//obtiene el detalle de la reserva
exports.getDetallePedido = function(req, res){
	models.reservaDetalle.findAll({
		where:{
			ReservaId: req.params.id,
			status: 1
		},
		attributes:['id','ReservaId','TractorId', 'tipoAlquilerId','fechaSale','fechaRegresa','subTotal','cantidadHoras'],
		include:[
			{
				model: models.Tractor,
				where:{
					status: 1
				}
			},
			{
				model: models.tipoAlquiler,
				where:{
					status: 1
				}
			}
		]		
	}).then(function (registros){
		if(!registros){
			service.sendJSONresponse(res,500, {"type":false, "message": "registros no encontrado", "data": registros});
		}else{
			service.sendJSONresponse(res,200, {"type":true, "data":registros});
		}
	})
}

exports.postPedido = function(req, res){
	models.Reserva.create({
		observaciones: req.body.observaciones || null,
		adelanto: req.body.adelanto || null,
		fechaReservacion: moment(new Date(req.body.fechaReservacion)).format("YYYY-MM-DD"),
		ClienteId: req.body.ClienteId,
		SedeId: req.body.SedeId,
		estadoPedidoId: req.body.estadoPedidoId || 1,
		EmpleadoId: req.body.EmpleadoId,
		status: 1
	}).then(function (registro){
		if(!registro){
			service.sendJSONresponse(res, 500, {"type":false, "message": "Error al crear el registro"});
		}else{
			insertPedidoDetalle(res, JSON.parse(req.body.detalleReserva), registro.id);
			service.sendJSONresponse(res, 200, {"type":true, "message": "Registro creado exitosamente"})
		}
	})
}

//Inserta los registros en el Detalle de la Reserva
function insertPedidoDetalle (res, arrayTractores, reservaId){
	var _arrayTractores = [];
	_arrayTractores = arrayTractores;
	arrayTractores.forEach(function (item){
		models.reservaDetalle.create({
			ReservaId: reservaId,
			TractorId: item.id,
			tipoAlquilerId: item.tipoAlquilerId,
			fechaSale: moment(new Date(item.fechaDespacho)).format("YYYY-MM-DD"),
			fechaRegresa: moment(new Date(item.fechaRegreso)).format("YYYY-MM-DD"),
			subTotal: item.subTotal,
			cantidadHoras: item.horasAlquiler,
			observacion: item.observacion || null,
			status: 1
		}).then(function (tractor){
			if(!tractor){
				service.sendJSONresponse(res,400,{"type":false, "message": "Error al agregar el tractor a la Reserva", "data": tractor});
			}else{
				models.Tractor.update({
					estadoEquipoId: 2
				},{
					where:{
						id: item.id,
					}
				}).then(function (_tractor){
					if(!_tractor){
						service.sendJSONresponse(res,400,{"type":false, "message": "Error al actualizar el estado del Tractor", "data": tractor})
					}
				})
			}
		})
	})
}

//Inserta un elemento individual al detalle de la reserva
exports.postPedidoDetalle = function(req, res){
	models.reservaDetalle.create({
		ReservaId: reservaId,
			TractorId: req.body.tractorId,
			tipoAlquilerId: req.body.tipoAlquilerId,
			fechaSale: req.body.fechaSale,
			fechaRegresa: req.body.fechaRegresa,
			subTotal: req.body.subTotal,
			cantidadHoras: req.body.cantidadHoras,
			observacion: req.body.observacion || null,
			status: 1
	}).then(function (detalle){
		if(!detalle){
			service.sendJSONresponse(res, 500, {"type":false, "message": "Error al crear el registro"});
		}else{
			models.Tractor.update({
				estadoEquipoId: 2
			},{
				where:{
					id: req.body.tractorId,
				}
			}).then(function (_tractor){
				if(!_tractor){
					service.sendJSONresponse(res,400,{"type":false, "message": "Error al actualizar el estado del Tractor", "data": tractor})
				}
			})
			service.sendJSONresponse(res, 200, {"type":true, "message": "Registro agregado exitosamente"})
		}
	})
}

// exports.putReserva = function(){
// 	models.Reserva.update({
// 		observaciones: req.body.observaciones || null,
// 		adelanto: req.body.adelanto || null,
// 		fechaReservacion: req.body.fechaReservacion
// 	},{
// 		where:{
// 			id: req.params.id
// 		}
// 	}).then(function (registro){
// 		if(!registro){
// 			service.sendJSONresponse(res, 500, {"type":false, "message": "Error al crear el registro"});
// 		}else{
// 			service.sendJSONresponse(res, 200, {"type":true, "message": "Registro modificado exitosamente", "data":registro})
// 		}
// 	})
// }

//Empleado dado de baja
exports.deletePedido = function(req, res){
	models.Reserva.update({
		status: 0
	},{
		where: {
			id: req.params.id,
		}
	}).then(function (registro){
		if(!registro){
			service.sendJSONresponse(res, 500, {"type": false, "message": "Error al eliminar el registro"});
		}else{
			models.reservaDetalle.update({
				status: 0
			},{
				where:{
					ReservaId: req.params.id
				}
			}).then(function (detalle){
				if(!detalle){
					service.sendJSONresponse(res, 500, {"type": false, "message": "Error al eliminar el registro"});
				}
			})
			service.sendJSONresponse(res, 200, {"type": true, "message": "Registro eliminado del sistema"});
		}
	})
}

//Elimina un Detalle de Reserva
exports.deletePedidoDetalle = function (req, res){
	models.reservaDetalle.update({
		status: 0
	},{
		where: {
			id: req.params.id
		}
	}).then(function (registro){
		if(!registro){
			service.sendJSONresponse(res, 500, {"type": false, "message": "Error al eliminar el registro"});
		}else{
			service.sendJSONresponse(res, 200, {"type": true, "message": "Registro eliminado de la reservacion"});
		}
	})
}