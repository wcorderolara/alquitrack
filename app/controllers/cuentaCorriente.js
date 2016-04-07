var models = require('../../models');
var service = require('../services/service');

exports.getCuentaCorrienteBySede = function (req, res){
	models.cuentaCorriente.findAll({
		where:{
			status: 1,
		},
		include:[
			{
				model: models.Factura,
				attributes: ['correlativo', 'monto','fechaCreacion','PaiId','SedeId', 'id'],
				where: {
					status: 1
				},
				include: [
					{
						model: models.Sede,
						attributes: ['descripcion','id'],
						where:{
							status: 1,
							id: req.params.SedeId
						}
					},
					{
						model: models.Pais,
						where:{
							status: 1
						},
						include:[
							{
								model: models.correlativosFactura,
								attributes: ['serie','id'],
								where:{
									status: 1
								}
							}
						]
					}
				]
			},
			{
				model: models.Cliente,
				attributes: ['nombre', 'apellido', 'id'],
				where:{
					status: 1
				}
			}
		]
	}).then(function (registros){
		if(!registros){
			service.sendJSONresponse(res, 500, {"type":false, "message": "Error al obtener los registros"});
		}else{
			service.sendJSONresponse(res, 200, {"type":true, "data": registros});
		}
	})
}


exports.getCuentasCorrientes = function (req, res){
	models.cuentaCorriente.findAll({
		where:{
			status: 1,
		},
		include:[
			{
				model: models.Factura,
				attributes: ['correlativo', 'monto','fechaCreacion','PaiId','SedeId', 'id'],
				where: {
					status: 0
				},
				include: [
					{
						model: models.Sede,
						attributes: ['descripcion','id'],
						where:{
							status: 1,
						}
					},
					{
						model: models.Pais,
						where:{
							status: 1
						},
						include:[
							{
								model: models.correlativosFactura,
								attributes: ['serie','id'],
								where:{
									status: 1
								}
							}
						]
					}
				]
			},
			{
				model: models.Cliente,
				attributes: ['nombre', 'apellido', 'id'],
				where:{
					status: 1
				}
			}
		]
	}).then(function (registros){
		if(!registros){
			service.sendJSONresponse(res, 500, {"type":false, "message": "Error al obtener los registros"});
		}else{
			service.sendJSONresponse(res, 200, {"type":true, "data": registros});
		}
	})
}

exports.postCuentaCorriente = function(req, res){
	models.cuentaCorriente.create({
		saldoFactura: req.body.saldoFactura,
		diasCredito: req.body.diasCredito,
		fechaVencimiento: req.body.fechaVencimiento,
		status: 1,
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

// exports.getClientesBySede = function(req, res){
// 	models.Cliente.findAll({
// 		where: {
// 			status: 1,
// 			PaiId: req.params.SedeId
// 		},
// 		include:[
// 			{
// 				model: models.tipoCliente,
// 				attributes: ['descripcion','id'],
// 				where:{
// 					status: 1
// 				}
// 			},
// 			{
// 				model: models.Pais,
// 				attributes: ['descripcion','id','flag'],
// 				where:{
// 					status: 1
// 				}
// 			},
// 			{
// 				model: models.tipoCredito,
// 				attributes: ['descripcion','id'],
// 				where: {
// 					status: 1
// 				}
// 			},
// 			{
// 				model: models.Sede,
// 				attributes: ['descripcion','PaiId'],
// 				where: {
// 					status: 1
// 				}
// 			}
// 		]
// 	}).then(function (registros){
// 		if(!registros){
// 			service.sendJSONresponse(res, 500, {"type":false, "message": "error al obtener los registros", "data":registros});
// 		}else{
// 			service.sendJSONresponse(res,200, {"type":true, "data": registros});
// 		}
// 	})
// };

// exports.getClientes = function(req, res){
// 	models.Cliente.findAll({
// 		where: {
// 			status: 1
// 		},
// 		include:[
// 			{
// 				model: models.tipoCliente,
// 				attributes: ['descripcion','id'],
// 				where:{
// 					status: 1
// 				}
// 			},
// 			{
// 				model: models.Pais,
// 				attributes: ['descripcion','id','flag'],
// 				where:{
// 					status: 1
// 				}
// 			},
// 			{
// 				model: models.tipoCredito,
// 				attributes: ['descripcion','id'],
// 				where: {
// 					status: 1
// 				}
// 			},
// 			{
// 				model: models.Sede,
// 				attributes: ['descripcion','PaiId'],
// 				where: {
// 					status: 1
// 				}
// 			}
// 		]
// 	}).then(function (registros){
// 		if(!registros){
// 			service.sendJSONresponse(res, 500, {"type":false, "message": "error al obtener los registros", "data":registros});
// 		}else{
// 			service.sendJSONresponse(res,200, {"type":true, "data": registros});
// 		}
// 	})
// };

// exports.getCliente = function(req, res){
// 	models.Cliente.findOne({
// 		where: {
// 			id: req.params.id,
// 			status: 1
// 		},
// 		include:[
// 			{
// 				model: models.tipoCliente,
// 				attributes: ['descripcion','id'],
// 				where:{
// 					status: 1
// 				}
// 			},
// 			{
// 				model: models.Pais,
// 				attributes: ['descripcion','id','flag'],
// 				where:{
// 					status: 1
// 				}
// 			},
// 			{
// 				model: models.tipoCredito,
// 				attributes: ['descripcion','id'],
// 				where: {
// 					status: 1
// 				}
// 			},
// 			{
// 				model: models.Sede,
// 				attributes: ['descripcion','PaiId'],
// 				where: {
// 					status: 1
// 				}
// 			}
// 		]
// 	}).then(function (registro){
// 		if(!registro){
// 			service.sendJSONresponse(res,500, {"type":false, "message": "registro no encontrado", "data": registro});
// 		}else{
// 			service.sendJSONresponse(res,200, {"type":true, "data":registro});
// 		}
// 	})
// };

// exports.putCliente = function(){
// 	models.Cliente.update({
// 		nombre: req.body.nombre,
// 		apellido: req.body.apellido,
// 		numeroTributacion: req.body.numeroTributacion,
// 		numeroIdentificacion: req.body.numeroIdentificacion || null,
// 		direccion: req.body.direccion,
// 		telefono: req.body.telefono,
// 		email: req.body.email || null,
// 		website: req.body.website || null,
// 		tieneCredito : req.body.tieneCredito || 0,
// 		tipoClienteId: req.body.tipoCliente,
// 		tipoCreditoId: req.body.tipoCreditoId,
// 		SedeId: req.body.SedeId
// 	},{
// 		where:{
// 			id: req.params.id
// 		}
// 	}).then(function (registro){
// 		if(!registro){
// 			service.sendJSONresponse(res, 500, {"type":false, "message": "Error al crear el registro"});
// 		}else{
// 			service.sendJSONresponse(res, 200, {"type":true, "message": "Registro creado exitosamente", "data":registro})
// 		}
// 	})
// }

//Empleado dado de baja
// exports.deleteCliente = function(req, res){
// 	models.Cliente.update({
// 		status: 0
// 	},{
// 		where: {
// 			id: req.params.id,
// 		}
// 	}).then(function (registro){
// 		if(!registro){
// 			service.sendJSONresponse(res, 500, {"type": false, "message": "Error al eliminar el registro"});
// 		}else{
// 			service.sendJSONresponse(res, 200, {"type": true, "message": "Registro eliminado del sistema..."});
// 		}
// 	})
// }