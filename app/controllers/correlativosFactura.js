var models = require('../../models');
var service = require('../services/service');

exports.getCorrelativosFactura = function(req, res){
	models.correlativosFactura.findAll({
		where: {
			status: 1
		},
		include:[
			{
				model: models.Pais,
				where:{
					status: 1,
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

exports.getCorrelativoFactura = function(req, res){
	models.correlativosFactura.findOne({
		where: {
			id: req.params.id,
			status: 1
		},
		include:[
			{
				model: models.Pais,
				where:{
					status: 1,
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

exports.postCorrelativoFactura = function(req, res){
	models.correlativosFactura.create({
		serie: req.body.serie,
		cantidadAprobadas: req.body.cantidadAprobadas,
		resolucion: req.body.resolucion,
		PaiId: req.body.PaiId ,
		status: 1
	}).then(function (registro){
		if(!registro){
			service.sendJSONresponse(res, 500, {"type":false, "message": "Error al crear el registro"});
		}else{
			service.sendJSONresponse(res, 200, {"type":true, "message": "Registro creado exitosamente"})
		}
	})
}

exports.putCorrelativoFactura = function(req,res){
	models.correlativosFactura.update({
		serie: req.body.serie,
		cantidadAprobadas: req.body.cantidadAprobadas,
		resolucion: req.body.resolucion,
		PaiId: req.body.PaiId,
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
exports.deleteCorrelativoFactura = function(req, res){
	models.correlativosFactura.update({
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