var models = require('../../models');
var service = require('../services/service');

exports.getFacturas = function(req, res){
	models.Factura.findAll({
		where: {
			$or:[
				{status: [0,1]}
			]
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
				model: models.Pais,
				attributes: ['descripcion','id'],
				where: {
					status: 1
				},
				include:[
					{
						model: models.correlativosFactura,
						where:{
							status: 1
						}
					}
				]
			},
			{
				model: models.tipoPago,
				attributes: ['descripcion','id'],
				where: {
					status: 1
				}
			},
			{
				model: models.Empleado,
				attributes: ['nombre','apellido','id'],
				where:{
					status: 1
				}
			},
			{
				model: models.Usuario,
				attributes: ['EmpleadoId','userLogin'],
				where:{
					status: 1
				}
			},
			{
				model: models.Sede,
				attributes: ['descripcion','id'],
				where:{
					status: 1
				}
			},
			{
				model: models.tipoOperacion,
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

exports.getFacturasBySede = function(req, res){
	models.Factura.findAll({
		where: {
			$or:[
				{status: [0,1]}
			],
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
				model: models.Pais,
				attributes: ['descripcion','id'],
				where: {
					status: 1
				},
				include:[
					{
						model: models.correlativosFactura,
						where:{
							status: 1
						}
					}
				]
			},
			{
				model: models.tipoPago,
				attributes: ['descripcion','id'],
				where: {
					status: 1
				}
			},
			{
				model: models.Empleado,
				attributes: ['nombre','apellido','id'],
				where:{
					status: 1
				}
			},
			{
				model: models.Usuario,
				attributes: ['EmpleadoId','userLogin'],
				where:{
					status: 1
				}
			},
			{
				model: models.Sede,
				attributes: ['descripcion','id'],
				where:{
					status: 1
				}
			},
			{
				model: models.tipoOperacion,
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

exports.getFactura = function(req, res){
	models.Factura.findOne({
		where: {
			id: req.params.id
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
				model: models.Pais,
				attributes: ['descripcion','id'],
				where: {
					status: 1
				}
			},
			{
				model: models.tipoPago,
				attributes: ['descripcion','id'],
				where: {
					status: 1
				}
			},
			{
				model: models.Empleado,
				attributes: ['nombre','apellido','id'],
				where:{
					status: 1
				}
			},
			{
				model: models.Usuario,
				attributes: ['EmpleadoId','userLogin'],
				where:{
					status: 1
				}
			},
			{
				model: models.Sede,
				attributes: ['descripcion','id'],
				where:{
					status: 1
				}
			},
			{
				model: models.tipoOperacion,
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
exports.getDetalleFactura = function(req, res){
	models.facturaDetalle.findAll({
		where:{
			FacturaId: req.params.id
		},
		include:[			
			{
				model: models.Tractor,
				attributes: ['nombre','id'],
				where:{
					status: 1
				}
			},
			{
				model: models.tipoAlquiler,
				attributes: ['descripcion','id'],
				where: {
					status: 1
				}
			}
		]
	}).then(function (registros){
		if(!registros){
			service.sendJSONresponse(res,500, {"type":false, "message": "registros no encontrado", "data": registros});
		}else{
			service.sendJSONresponse(res,200, {"type":true, "data":registros});
		}
	})
}

exports.postFactura = function(req, res){
	models.Factura.create({
		monto: req.body.monto || null,
		aceptoContrato: req.body.aceptoContrato || 1,
		fechaCreacion: req.body.fechaCreacion,
		status: req.body.status,
		ClienteId: req.body.ClienteId,
		PaiId: req.body.PaiId,
		tipoPagoId: req.body.tipoPagoId,
		EmpleadoId: req.body.EmpleadoId,
		UsuarioId: req.body.UsuarioId,
		SedeId: req.body.SedeId,
		tipoOperacionId: req.body.tipoOperacionId
	}).then(function (factura){
		if(!factura){
			service.sendJSONresponse(res, 500, {"type":false, "message": "Error al crear la factura"});
		}else{
			models.Reserva.update({
				estadoPedidoId: 2
			},{
				where:{
					id: req.body.PedidoId
				}
			}).then(function (reserva){
				if(!reserva){
					service.sendJSONresponse(res, 500, {"type":false, "message": "Error al actualizar el Pedido"});
				}
			})

			models.correlativosFactura.findOne({
				where:{
					PaiId: req.body.PaiId,
					status: 1
				},
				attributes: ['id', 'cantidadAprobadas', 'cantidadConsumidas', 'cantidadDisponibles']
			}).then(function (correlativo){
				var _correlativo =  parseInt(correlativo.cantidadConsumidas) + 1;
				var _disponibles = parseInt(correlativo.cantidadAprobadas) - _correlativo;
				correlativo.update({
					cantidadConsumidas: _correlativo,
					cantidadDisponibles: _disponibles
				}).then(function (_newCorrelativo){
					factura.update({
						correlativo: _newCorrelativo.cantidadConsumidas
					}).then(function (_newFactura){
						insertDetalleFactura(res, JSON.parse(req.body.detalleFactura), factura.id);
					})
				})
			})
			service.sendJSONresponse(res, 200, {"type":true, "message": "Registro creado exitosamente","factura": factura })
		}
	})
}

//Inserta los registros en el Detalle de la Reserva
function insertDetalleFactura (res, arrayTractores, facturaId){
	var _arrayTractores = [];
	_arrayTractores = arrayTractores;

	arrayTractores.forEach(function (item){
		models.facturaDetalle.create({
			fechaSale: item.fechaSale,
			fechaRegresa: item.fechaRegresa,
			subTotal: item.subTotal,
			FacturaId: facturaId,
			TractorId: item.TractorId,
			tipoAlquilerId: item.tipoAlquilerId
		}).then(function (tractor){
			if(!tractor){
				sendJSONresponse(res,400,{"type":false, "message": "Error al agregar el tractor a la Factura", "data": tractor});
			}
		})
	})
}

//Empleado dado de baja
exports.deleteFactura = function(req, res){
	models.Factura.update({
		status: 0
	},{
		where: {
			id: req.params.id,
		}
	}).then(function (registro){
		if(!registro){
			service.sendJSONresponse(res, 500, {"type": false, "message": "Error al eliminar el registro"});
		}else{
			models.facturaDetalle.update({
				status: 0
			},{
				where:{
					FacturaId: req.params.id
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
