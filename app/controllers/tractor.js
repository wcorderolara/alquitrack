var models = require('../../models');
var service = require('../services/service');

exports.getTractores = function(req, res){
	models.Tractor.findAll({
		where: {
			status: 1
		},
		include:[
			{
				model: models.estadoEquipo,
				attributes: ['descripcion','id'],
				where:{
					status: 1
				}
			},
			{
				model: models.Pais,
				attributes: ['descripcion','id','flag'],
				where:{
					status: 1
				}
			},
			{
				model: models.tipoEquipo,
				attributes: ['descripcion','id'],
				where: {
					status: 1
				}
			},
			{
				model: models.Sede,
				attributes: ['descripcion','id'],
				where: {
					status: 1,
					id: req.params.sedeId
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

exports.getTractor = function(req, res){
	models.Tractor.findOne({
		where: {
			id: req.params.id,
			status: 1
		},
		include:[
			{
				model: models.estadoEquipo,
				attributes: ['descripcion','id'],
				where:{
					status: 1
				}
			},
			{
				model: models.Pais,
				attributes: ['descripcion','id','flag'],
				where:{
					status: 1
				}
			},
			{
				model: models.tipoEquipo,
				attributes: ['descripcion','id'],
				where: {
					status: 1
				}
			},
			{
				model: models.Sede,
				attributes: ['descripcion','id'],
				where: {
					status: 1,
					id: req.params.sedeId
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

exports.postTractor = function(req, res){
	models.Tractor.create({
		nombre: req.body.nombre,
		descripcion: req.body.descripcion,
		marca: req.body.marca,
		modelo: req.body.modelo,
		anio: req.body.anio || null,
		fechaCompra: req.body.fechaCompra || null,
		imagen: req.body.imagen || null,
		estadoEquipoId: req.body.estadoEquipoId,
		PaiId: req.body.PaiId,
		SedeId: req.body.SedeId,
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

exports.putTractor = function(){
	models.Tractor.update({
		nombre: req.body.nombre,
		descripcion: req.body.descripcion,
		marca: req.body.marca,
		modelo: req.body.modelo,
		anio: req.body.anio || null,
		fechaCompra: req.body.fechaCompra || null,
		imagen: req.body.imagen || null,
		estadoEquipoId: req.body.estadoEquipoId,
		PaiId: req.body.PaiId,
		SedeId: req.body.SedeId,
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
exports.deleteTractor = function(req, res){
	models.Tractor.update({
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