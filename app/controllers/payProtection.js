var models = require('../../models');
var service = require('../services/service');

exports.getPaysProtection = function(req, res){
	models.payProtection.findAll({
		where: {
			status: 1
		},
		include:[
			{
				model: models.Cliente,
				attributes: ['nombre','apellido','direccion','telefono'],
				where:{
					status: 1
				}
			},
			{
				model: models.Factura,
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

exports.getPayProtection = function(req, res){
	models.payProtection.findOne({
		where: {
			id: req.params.id,
			status: 1
		},
		include:[
			{
				model: models.Cliente,
				attributes: ['nombre','apellido','direccion','telefono'],
				where:{
					status: 1
				}
			},
			{
				model: models.Factura,
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

exports.postPayProtection = function(req, res){
	models.payProtection.create({
		fechaCobro: req.body.fechaCobro,
		monto: req.body.monto,
		ClienteId: req.body.ClienteId,
		FacturaId: req.body.FacturaId
	}).then(function (registro){
		if(!registro){
			service.sendJSONresponse(res, 500, {"type":false, "message": "Error al crear el registro"});
		}else{
			service.sendJSONresponse(res, 200, {"type":true, "message": "Registro creado exitosamente"})
		}
	})
}

exports.putPayProtection = function(){
	models.payProtection.update({
		fechaCobro: req.body.fechaCobro,
		monto: req.body.monto,
		ClienteId: req.body.ClienteId,
		FacturaId: req.body.FacturaId
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
exports.deletePayProtection = function(req, res){
	models.payProtection.update({
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