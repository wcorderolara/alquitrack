var models = require('../../models');
var service = require('../services/service');

exports.postCaja = function(req, res){
	models.Caja.create({
		monto: req.body.monto,
		numeroCheque: req.body.numeroCheque,
		fechaCobroCheque: req.body.fechaCobroCheque,
		tipoOperacionId: req.body.tipoOperacionId,
		tipoPagoId: req.body.tipoPagoId,
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

exports.postAbonoCaja = function(req, res){
	models.Caja.create({
		monto: req.body.monto,
		numeroCheque: req.body.numeroCheque,
		fechaCobroCheque: req.body.fechaCobroCheque,
		tipoOperacionId: req.body.tipoOperacionId,
		tipoPagoId: req.body.tipoPagoId,
		ClienteId: req.body.ClienteId,
		FacturaId: req.body.FacturaId
	}).then(function (registro){
		if(!registro){
			service.sendJSONresponse(res, 500, {"type":false, "message": "Error al crear el registro"});
		}else{
			if(req.body.tipoOperacionId == 4){
				models.cuentaCorriente.update({
					status: 0,
					saldoFactura: 0
				},{
					where:{
						FacturaId: req.body.FacturaId
					}
				}).then(function (cuenta){
					if(!cuenta){
						service.sendJSONresponse(res, 500, {"type":false, "message": "Error al actualizar la cuenta corriente"});
					}else{
						models.Factura.update({
							status: 0
						},{
							where:{
								id: req.body.FacturaId
							}
						}).then(function (factura){
							if(!factura){
								service.sendJSONresponse(res, 500, {"type":false, "message": "Error al actualizar la cuenta corriente"});
							}else{
								service.sendJSONresponse(res, 200, {"type":true, "message": "Abono creado exitosamente"})
							}
						});
					}
				});
			}else if(req.body.tipoOperacionId == 3){
				models.cuentaCorriente.findOne({
					where:{
						FacturaId: req.body.FacturaId
					}
				}).then(function (cuenta){
					if( parseInt(cuenta.saldoFactura) == parseInt(req.body.monto) ){
						cuenta.update({
							status: 0,
							saldoFactura: 0
						}).then(function (_cuenta){
							if(!_cuenta){
								service.sendJSONresponse(res, 500, {"type":false, "message": "Error al actualizar la cuenta corriente"});
							}else{
								models.Factura.update({
									status: 0
								},{
									where:{
										id: req.body.FacturaId
									}
								}).then(function (factura){
									if(!factura){
										service.sendJSONresponse(res, 500, {"type":false, "message": "Error al actualizar la cuenta corriente"});
									}else{
										service.sendJSONresponse(res, 200, {"type":true, "message": "Abono creado exitosamente"})
									}
								});
							}
						});
					}else{
						var _saldoFactura = cuenta.saldoFactura;
						var _nuevoSaldo = _saldoFactura - req.body.monto;
						cuenta.update({
							saldoFactura: _nuevoSaldo
						}).then(function (_cuenta){
							if(!_cuenta){
								service.sendJSONresponse(res, 500, {"type":false, "message": "Error al actualizar la cuenta corriente"});
							}else{
								service.sendJSONresponse(res, 200, {"type":true, "message": "Abono creado exitosamente"})
							}
						});
					}
				});
			}
		}
	});
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