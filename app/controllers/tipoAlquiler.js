var models = require('../../models');
var service = require('../services/service');

exports.getTiposAlquiler = function(req, res){
	models.tipoAlquiler.findAll({
		where: {
			status: 1
		},
		attributes: ['id', 'descripcion', 'status', 'horasMinimas']//,
		// include:[
		// 	{
		// 		model: models.precioEquipo,
		// 		attributes: ['precio', 'id'],
		// 		where:{
		// 			status: 1
		// 		}
		// 	}
		// ]
	}).then(function (registros){
		if(!registros){
			service.sendJSONresponse(res, 500, {"type":false, "message": "error al obtener los registros", "data":registros});
		}else{
			service.sendJSONresponse(res,200, {"type":true, "data": registros});
		}
	})
};

exports.getTipoAlquilerTractor = function(req, res){
	models.tipoAlquiler.findAll({
		where: {
			status: 1
		},
		attributes: ['id', 'descripcion', 'status', 'horasMinimas'],
		include:[
			{
				model: models.precioEquipo,
				attributes: ['precio', 'id'],
				where:{
					status: 1,
					tipoEquipoId: req.params.tipoEquipoId
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

exports.getTipoAlquiler = function(req, res){
	models.tipoAlquiler.findOne({
		where: {
			id: req.params.id,
			status: 1
		},
		attributes: ['id', 'descripcion', 'status', 'horasMinimas']
	}).then(function (registro){
		if(!registro){
			service.sendJSONresponse(res,500, {"type":false, "message": "registro no encontrado", "data": registro});
		}else{
			service.sendJSONresponse(res,200, {"type":true, "data":registro});
		}
	})
};

exports.postTipoAlquiler = function(req, res){
	models.tipoAlquiler.create({
		descripcion: req.body.descripcion
	}).then(function (registro){
		if(!registro){
			service.sendJSONresponse(res, 500, {"type":false, "message": "Error al crear el regstro"});
		}else{
			service.sendJSONresponse(res, 200, {"type":true, "message": "Registro creado exitosamente"});
		}
	})
}

exports.putTipoAlquiler = function(req, res){
	models.tipoAlquiler.update({
		descripcion: req.body.descripcion
	},{
		where: {
			id: req.params.id
		}
	}).then(function (registro){
		if(!registro){
			service.sendJSONresponse(res, 500, {"type":false, "message": "Error al actualziar el registro"});
		}else{
			service.sendJSONresponse(res, 200, {"type":true, "message": "Registro Actualizado exitosamente", "data": registro});
		}
	})
}

exports.deleteTipoAlquiler = function(req, res){
	models.tipoAlquiler.update({
		status: 0
	},{
		where: {
			id: req.params.id,
		}
	}).then(function (registro){
		if(!registro){
			service.sendJSONresponse(res, 500, {"type": false, "message": "Error al eliminar el registro"});
		}else{
			service.sendJSONresponse(res, 200, {"type": true, "message": "Registro Eliminado exitosamente"});
		}
	})
}