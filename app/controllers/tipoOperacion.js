var models = require('../../models');
var service = require('../services/service');

exports.getTipoOperacionFactura = function(req, res){
	models.tipoOperacion.findAll({
		where: {
			status: 1,
			$in:[
				{id: [1,2]}
			]
		}
	}).then(function (registros){
		if(!registros){
			service.sendJSONresponse(res, 500, {"type":false, "message": "error al obtener los registros", "data":registros});
		}else{
			service.sendJSONresponse(res,200, {"type":true, "data": registros});
		}
	})
};

exports.getTipoOperacionAbono = function(req, res){
	models.tipoOperacion.findAll({
		where: {
			status: 1,
			$in:[
				{id: [3,4]}
			]
		}
	}).then(function (registros){
		if(!registros){
			service.sendJSONresponse(res, 500, {"type":false, "message": "error al obtener los registros", "data":registros});
		}else{
			service.sendJSONresponse(res,200, {"type":true, "data": registros});
		}
	})
};