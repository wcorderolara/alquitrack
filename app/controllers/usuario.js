var models = require('../../models');
var service = require('../services/service');
var crypto = require('crypto');
var passport = require('passport');

exports.getUsuarios = function(req, res){
	models.Usuario.findAll({
		where: {
			status: 1
		},
		include:[
			{
				model: models.Empleado,
				attributes: ['nombre','apellido','fotografia','id', 'SedeId'],
				where:{
					status: 1,
					estadoEmpleado: 1
				}
			},
			{
				model: models.tipoUsuario,
				attributes: ['descripcion','id'],
				where:{
					status: 1
				}
			},
			{
				model: models.Rol,
				attributes: ['descripcion','id'],
				where: {
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

exports.getUsuario = function(req, res){
	models.Usuario.findOne({
		where: {
			id: req.params.id,
			status: 1
		},
		include:[
			{
				model: models.Empleado,
				where:{
					status: 1,
					estadoEmpleado: 1
				}
			},
			{
				model: models.tipoUsuario,
				attributes: ['descripcion','id'],
				where:{
					status: 1
				}
			},
			{
				model: models.Rol,
				attributes: ['descripcion','id'],
				where: {
					status: 1
				}
			}
		]
	}).then(function (registro){
		if(!registro){
			service.sendJSONresponse(res,500, {"type":false, "message": "pais no encontrado", "data": registro});
		}else{
			service.sendJSONresponse(res,200, {"type":true, "data":registro});
		}
	})
};

exports.postUsuario = function(req, res){
	models.Usuario.create({
		userLogin: req.body.userLogin,
		salt: crypto.randomBytes(16).toString('hex'),
		EmpleadoId: req.body.EmpleadoId,
		tipoUsuarioId: req.body.tipoUsuarioId,
		RolId: req.body.RolId
	}).then(function (registro){
		if(!registro){
			service.sendJSONresponse(res, 500, {"type":false, "message": "Error al crear el registro"});
		}else{
			var _token = service.createToken(registro);
			registro.update({
				hash: crypto.pbkdf2Sync(req.body.password, registro.salt, 1000, 64).toString('hex')
			}).then(function(){
				service.sendJSONresponse(res, 200, {"type":true, "message": "Registro creado exitosamente", "token":_token})
			})
		}
	})
}

exports.deleteUsuario = function(req, res){
	models.Empleado.update({
		status: 0
	},{
		where: {
			id: req.params.id,
		}
	}).then(function (registro){
		if(!registro){
			service.sendJSONresponse(res, 500, {"type": false, "message": "Error al eliminar el registro"});
		}else{
			service.sendJSONresponse(res, 200, {"type": true, "message": "Usuario eliminado del sistema..."});
		}
	})
}

exports.loginUser = function(req, res){
	if(!req.body.userLogin || !req.body.password){
		service.sendJSONresponse(res,400,{"type":false,"message":"Todos los campos son requeridos"});
	}

	passport.authenticate('local', function(err, user, info){
		var _token;
		if(err){
			service.sendJSONresponse(res,404,{"type":false,"data":err,"dataType":"Error"});
			return false;
		}

		if(user){
			_token = service.createToken(user);
			service.sendJSONresponse(res,200,{"type":true, "token":_token);
		}else{
			service.sendJSONresponse(res,401,{"type":false,"data":info, "dataType":"Info"});
		}
	})(req, res);
}