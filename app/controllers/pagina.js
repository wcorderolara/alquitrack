var models = require('../../models');
var service = require('../services/service');

exports.getPaginas = function(req, res){
	models.Pagina.findAll({
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

exports.getPagina = function(req, res){
	models.Pagina.findOne({
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

exports.postPagina = function(req, res){
	models.Pagina.create({
		descripcion: req.body.descripcion,
		link: req.body.url || null
	}).then(function (registro){
		if(!registro){
			service.sendJSONresponse(res, 500, {"type":false, "message": "Error al crear el regstro"});
		}else{
			service.sendJSONresponse(res, 200, {"type":true, "message": "Registro creado exitosamente"});
		}
	})
}

exports.putPagina = function(req, res){
	models.Pagina.update({
		descripcion: req.body.descripcion,
		link: req.body.url || null
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

exports.deletePagina = function(req, res){
	models.Pagina.update({
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