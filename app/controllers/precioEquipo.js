var models = require('../../models');
var service = require('../services/service');

exports.getPreciosEquipo = function(req, res){
	models.precioEquipo.findAll({
		where: {
			status: 1
		},
		include:[
			{
				model: models.tipoEquipo,
				attributes: ['descripcion','id'],
				where:{
					status: 1
				}
			},
			{
				model: models.tipoAlquiler,
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

exports.getPrecioEquipo = function(req, res){
	models.precioEquipo.findOne({
		where: {
			id: req.params.id,
			status: 1
		},
		include:[
			{
				model: models.tipoEquipo,
				attributes: ['descripcion','id'],
				where:{
					status: 1
				}
			},
			{
				model: models.tipoAlquiler,
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

exports.postPrecioEquipo = function(req, res){
	models.precioEquipo.create({
		precio: req.body.precio,
		tipoAlquilerId: req.body.tipoAlquilerId,
		tipoequipoId; req.body.tipoEquipoId,
		status: 1
	}).then(function (registro){
		if(!registro){
			service.sendJSONresponse(res, 500, {"type":false, "message": "Error al crear el registro"});
		}else{
			service.sendJSONresponse(res, 200, {"type":true, "message": "Registro creado exitosamente"})
		}
	})
}

exports.putPrecioEquipo = function(){
	models.precioEquipo.update({
		precio: req.body.precio,
		tipoAlquilerId: req.body.tipoAlquilerId,
		tipoequipoId; req.body.tipoEquipoId
	},{
		where:{
			id: req.params.id
		}
	}).then(function (registro){
		if(!registro){
			service.sendJSONresponse(res, 500, {"type":false, "message": "Error al crear el registro"});
		}else{
			service.sendJSONresponse(res, 200, {"type":true, "message": "Registro creado exitosamente", "data":registro})
		}
	})
}

//Empleado dado de baja
exports.deletePrecioEquipo = function(req, res){
	models.precioEquipo.update({
		status: 0
	},{
		where: {
			id: req.params.id,
		}
	}).then(function (registro){
		if(!registro){
			service.sendJSONresponse(res, 500, {"type": false, "message": "Error al eliminar el registro"});
		}else{
			service.sendJSONresponse(res, 200, {"type": true, "message": "Registro eliminado del sistema..."});
		}
	})
}