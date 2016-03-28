var models = require('../../models');
var service = require('../services/service');

exports.getReservas = function(req, res){
	models.Reserva.findAll({
		where: {
			status: 1,
			SedeId: req.params.SedeId
		},
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

exports.getReserva = function(req, res){
	models.Reserva.findOne({
		where: {
			id: req.params.id,
			status: 1
		},
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
exports.getDetalleReserva = function(req, res){
	models.reservaDetalle.findAll({
		where:{
			ReservaId: req.params.id,
			status: 1
		}
	}).then(function (registros){
		if(!registros){
			service.sendJSONresponse(res,500, {"type":false, "message": "registros no encontrado", "data": registros});
		}else{
			service.sendJSONresponse(res,200, {"type":true, "data":registros});
		}
	})
}

exports.postReserva = function(req, res){
	models.Reserva.create({
		observaciones: req.body.observaciones || null,
		adelanto: req.body.adelanto || null,
		fechaReservacion: req.body.fechaReservacion,
		ClienteId: req.body.ClienteId,
		SedeId: req.body.SedeId,
		status: 1
	}).then(function (registro){
		if(!registro){
			service.sendJSONresponse(res, 500, {"type":false, "message": "Error al crear el registro"});
		}else{
			insertDetalleReserva(res, JSON.parse(req.body.detalleReserva), rgistro.id);
			service.sendJSONresponse(res, 200, {"type":true, "message": "Registro creado exitosamente"})
		}
	})
}

//Inserta los registros en el Detalle de la Reserva
function insertDetalleReserva (res, arrayTractores, reservaId){
	var _arrayTractores = [];
	_arrayTractores = arrayTractores;

	arrayTractores.forEach(function (item){
		models.reservaDetalle.create({
			ReservaId: reservaId,
			TractorId: item.tractorId,
			observacion: item.observacion || null,
			status: 1
		}).then(function (tractor){
			if(!tractor){
				sendJSONresponse(res,400,{"type":false, "message": "Error al agregar el tractor a la Reserva", "data": tractor});
			}
		})
	})
}

//Inserta un elemento individual al detalle de la reserva
exports.postReservaDetalle = function(req, res){
	models.reservaDetalle.create({
		observacion: req.body.observacion,
		status: 1,
		ReservaId: req.body.ReservaId,
		TractorId: req.body.TractorId
	}).then(function (detalle){
		if(!detalle){
			service.sendJSONresponse(res, 500, {"type":false, "message": "Error al crear el registro"});
		}else{
			service.sendJSONresponse(res, 200, {"type":true, "message": "Registro agregado exitosamente"})
		}
	})
}

exports.putReserva = function(){
	models.Reserva.update({
		observaciones: req.body.observaciones || null,
		adelanto: req.body.adelanto || null,
		fechaReservacion: req.body.fechaReservacion
	},{
		where:{
			id: req.params.id
		}
	}).then(function (registro){
		if(!registro){
			service.sendJSONresponse(res, 500, {"type":false, "message": "Error al crear el registro"});
		}else{
			service.sendJSONresponse(res, 200, {"type":true, "message": "Registro modificado exitosamente", "data":registro})
		}
	})
}

//Empleado dado de baja
exports.deleteReserva = function(req, res){
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
exports.deleteDetalleReserva = function (req, res){
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