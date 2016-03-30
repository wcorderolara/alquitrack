var models = require('../../models');
var service = require('../services/service');
var cloudinary = require('cloudinary');

cloudinary.config({
	cloud_name: process.env.CDN_NAME,
	api_key: process.env.CDN_API_KEY,
	api_secret: process.env.CDN_API_SECRET
})

exports.getEmpleados = function(req, res){
		models.Empleado.findAll({
		where: {
			status: 1
		},
		include:[
			{
				model: models.Pais,
				attributes: ['descripcion','flag', 'id'],
				where:{
					status: 1
				}
			},
			{
				model: models.tipoEmpleado,
				attributes: ['descripcion','id'],
				where:{
					status: 1
				}
			},
			{
				model: models.estadoEmpleado,
				attributes: ['descripcion','id'],
				where: {
					status: 1
				}
			},
			{
				model: models.Sede,
				attributes: ['descripcion','PaiId','id'],
				where: {
					status: 1
				}
			}
		],
		order: 'PaiId'
	}).then(function (registros){
		if(!registros){
			service.sendJSONresponse(res, 500, {"type":false, "message": "error al obtener los registros", "data":registros});
		}else{
			service.sendJSONresponse(res,200, {"type":true, "data": registros});
		}
	})
}

exports.getEmpleadosBySede = function(req, res){
	models.Empleado.findAll({
		where: {
			status: 1,
			Sedeid: req.params.sedeId
		},
		include:[
			{
				model: models.Pais,
				attributes: ['descripcion','flag'],
				where:{
					status: 1
				}
			},
			{
				model: models.tipoEmpleado,
				attributes: ['descripcion','id'],
				where:{
					status: 1
				}
			},
			{
				model: models.estadoEmpleado,
				attributes: ['descripcion','id'],
				where: {
					status: 1
				}
			},
			{
				model: models.Sede,
				attributes: ['descripcion','PaiId','id'],
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

exports.getEmpleado = function(req, res){
	models.Empleado.findOne({
		where: {
			id: req.params.id,
			// SedeId: req.params.sedeId,
			status: 1
		},
		include:[
			{
				model: models.Pais,
				attributes: ['descripcion','flag'],
				where:{
					status: 1
				}
			},
			{
				model: models.tipoEmpleado,
				attributes: ['descripcion','id'],
				where:{
					status: 1
				}
			},
			{
				model: models.estadoEmpleado,
				attributes: ['descripcion','id'],
				where: {
					status: 1
				}
			},
			{
				model: models.Sede,
				attributes: ['descripcion','PaiId','id'],
				where: {
					status: 1
					// id: req.params.sedeId
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

exports.postEmpleado = function(req, res){
	models.Empleado.create({
		nombre: req.body.nombre,
		apellido: req.body.apellido,
		telefono: req.body.telefono,
		direccion: req.body.direccion,
		fechaNacimiento: req.body.fechaNacimiento,
		fotografia: req.body.fotografia || null,
		PaiId: req.body.PaiId,
		tipoEmpleadoId: req.body.tipoEmpleadoId,
		estadoEmpleadoId: req.body.estadoEmpleadoId || 1,
		SedeId: req.body.SedeId
	}).then(function (registro){
		if(!registro){
			service.sendJSONresponse(res, 500, {"type":false, "message": "Error al crear el registro"});
		}else{
			service.sendJSONresponse(res, 200, {"type":true, "message": "Registro creado exitosamente"});
		}
	})
}

exports.putEmpleado = function(req, res){
	models.Empleado.update({
		nombre: req.body.nombre,
		apellido: req.body.apellido,
		telefono: req.body.telefono,
		direccion: req.body.direccion,
		fechaNacimiento: req.body.fechaNacimiento,
		fotografia: req.body.fotografia || null,
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

//Empleado dado de baja
exports.deleteEmpleado = function(req, res){
	models.Empleado.update({
		fechaBaja: req.body.fechaBaja,
		estadoEmpleadoId: 4,
		status: 0
	},{
		where: {
			id: req.params.id,
		}
	}).then(function (registro){
		if(!registro){
			service.sendJSONresponse(res, 500, {"type": false, "message": "Error al eliminar el registro"});
		}else{
			// Crea un registro en empleados Despedidos
			models.empleadoDespedido.create({
				fechaBaja: req.body.fechaBaja,
				observaciones: req.body.observaciones,
				imgDespido: req.body.imgDespido || null
			}).then(function (_registro){
				if(!_registro){
					service.sendJSONresponse(res,500,{"type":false, "message": "Error al dar de baja al Empleado", "data": _registro});
				}
			});

			//Inactiva el Usuario si el empleado tuviera acceso al sistema

			models.Usuario.findOne({
				where:{
					EmpleadoId: req.params.id,
					status: 1
				}
			}).then(function (usuario){
				if(usuario){
					usuario.update({
						status: 0
					}).then(function(){
						service.sendJSONresponse(res,200,{"type":true,"message":"Se han removido los permisos del empleado"});
					})
				}
			})

			service.sendJSONresponse(res, 200, {"type": true, "message": "El empleado ha sido eliminado del sistema..."});
		}
	})
}

//Metodos Adicionales al CRUD
exports.uploadAvatar = function(req, res, next){
	cloudinary.uploader.upload(req.files.file.path, function(result, callback){
		sendJSONresponse(res,200,{"type":true,"data":result});
	});
}

//Empleado Suspendido

exports.getEmpleadosSuspendidos = function(req, res){
	models.Empleado.findAll({
		where:{
			estadoEmpleadoId: 2,
			status: 1
		},
		include: [
			{
				model: models.empleadoSuspendido,
				attributes: ['fechaDesde', 'fechaHasta', 'observaciones','imgSuspension'],
				where:{
					status: 1
				}
			},
			{
				model: models.Sede,
				attributes: ['descripcion','PaiId'],
				where: {
					status: 1,
					id: req.params.sedeId
				}
			}
		]
	}).then(function (registros){
		if(!registros){
			service.sendJSONresponse(res,500,{"type":false,"message":"Error al Obtener los empleados suspendidos", "data":registros});
		}else{
			service.sendJSONresponse(res,200,{"type":true, "data":registros});
		}
	})
}

exports.postEmpleadoSuspendido = function(req, res){
	models.empleadoSuspendido.create({
		fechaDesde: req.body.fechaDesde,
		fechaHasta: req.body.fechaHasta,
		observaciones: req.body.observaciones,
		imgSuspension: req.body.imgSuspension || null,
		EmpleadoId: req.body.EmpleadoId
	}).then(function (registro){
		if(!registro){
			service.sendJSONresponse(res, 500, {"type": false, "message": "Error al agregar el registro"});
		}else{
			models.Empleado.update({
				estadoEmpleadoId: 2
			},{
				where:{
					id: req.body.EmpleadoId
				}
			}).then(function (_registro){
				if(!_registro){
					service.sendJSONresponse(res, 500, {"type":false, "message": "Error al Actualizar el Empleado"});
				}
			})
			service.sendJSONresponse(res, 200, {"type": true, "message": "Registro Creado exitosamente"});
		}
	})
}

exports.putEmpleadoSuspendido = function(req,res){
	models.empleadoSuspendido.update({
		status: 0
	},{
		where:{
			EmpleadoId: req.params.EmpleadoId
		}
	}).then(function (registro){
		if(!registro){
			service.sendJSONresponse(res,500,{"type":false,"message":"Error al Obtener el registro","data":registro});
		}else{
			models.Empleado.update({
				estadoEmpleadoId: 1
			},{
				where:{
					id: req.params.EmpleadoId
				}
			}).then(function (_registro){
				if(!_registro){
					service.sendJSONresponse(res,500,{"type":false,"message":"Error al actualizar el estado del empleado","data":_registro});
				}
			});
			service.sendJSONresponse(res,200,{"type":true,"message":"Empleado listo para regresar al Trabajo"});
		}
	})
}

//Empleado Vacaciones
exports.getEmpleadosVacaciones = function(req, res){
	models.Empleado.findAll({
		where:{
			estadoEmpleadoId: 3,
			status: 1
		},
		include: [
			{
				model: models.empleadoVacaciones,
				attributes: ['fechaDesde', 'fechaHasta', 'observaciones','imgVacaciones'],
				where:{
					status: 1
				}
			},
			{
				model: models.Sede,
				attributes: ['descripcion','PaiId'],
				where: {
					status: 1,
					id: req.params.sedeId
				}
			}
		]
	}).then(function (registros){
		if(!registros){
			service.sendJSONresponse(res,500,{"type":false,"message":"Error al Obtener los empleados en Vacaciones", "data":registros});
		}else{
			service.sendJSONresponse(res,200,{"type":true, "data":registros});
		}
	})
}

exports.postEmpleadoVacaciones = function(req, res){
	models.empleadoVacaciones.create({
		fechaDesde: req.body.fechaDesde,
		fechaHasta: req.body.fechaHasta,
		observaciones: req.body.observaciones,
		imgVacaciones: req.body.imgVacaciones || null,
		EmpleadoId: req.body.EmpleadoId
	}).then(function (registro){
		if(!registro){
			service.sendJSONresponse(res, 500, {"type": false, "message": "Error al agregar el registro"});
		}else{
			models.Empleado.update({
				estadoEmpleadoId: 3
			},{
				where:{
					id: req.body.EmpleadoId
				}
			}).then(function (_registro){
				if(!_registro){
					service.sendJSONresponse(res, 500, {"type":false, "message": "Error al Actualizar el Empleado"});
				}
			})
			service.sendJSONresponse(res, 200, {"type": true, "message": "Registro Creado exitosamente"});
		}
	})
}

exports.putEmpleadoVacaciones = function(req,res){
	models.empleadoVacaciones.update({
		status: 0
	},{
		where:{
			EmpleadoId: req.params.EmpleadoId
		}
	}).then(function (registro){
		if(!registro){
			service.sendJSONresponse(res,500,{"type":false,"message":"Error al Obtener el registro","data":registro});
		}else{
			models.Empleado.update({
				estadoEmpleadoId: 1
			},{
				where:{
					id: req.params.EmpleadoId
				}
			}).then(function (_registro){
				if(!_registro){
					service.sendJSONresponse(res,500,{"type":false,"message":"Error al actualizar el estado del empleado","data":_registro});
				}
			});
			service.sendJSONresponse(res,200,{"type":true,"message":"Empleado listo para regresar al Trabajo"});
		}
	})
}