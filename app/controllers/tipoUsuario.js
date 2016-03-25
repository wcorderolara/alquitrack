var models = require('../../models');
var service = require('../services/service');

exports.getTiposUsuario = function(req, res){
	models.tipoUsuario.findAll({
		where: {
			status: 1
		}
	}).then(function (registros){
		if(!registros){
			service.sendJSONresponse(res, 500, {"type":false, "message": "error al obtener los registros", "data":registros});
		}else{
			service.sendJSONresponse(res,200, {"type":true, "data": registros});
		}
	})
};

exports.getTipoUsuario = function(req, res){
	models.tipoUsuario.findOne({
		where: {
			id: req.params.id,
			status: 1
		}
	}).then(function (registro){
		if(!registro){
			service.sendJSONresponse(res,500, {"type":false, "message": "registro no encontrado", "data": registro});
		}else{
			service.sendJSONresponse(res,200, {"type":true, "data":registro});
		}
	})
};

exports.postTipoUsuario = function(req, res){
	models.tipoUsuario.create({
		descripcion: req.body.descripcion
	}).then(function (registro){
		if(!registro){
			service.sendJSONresponse(res, 500, {"type":false, "message": "Error al crear el regstro"});
		}else{
			service.sendJSONresponse(res, 200, {"type":true, "message": "Registro creado exitosamente"});
		}
	})
}

exports.putTipoUsuario = function(req, res){
	models.tipoUsuario.update({
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

exports.deleteTipoUsuario = function(req, res){
	models.tipoUsuario.update({
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