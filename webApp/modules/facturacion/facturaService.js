alquitrackApp.service('facturaService', function ($http, $q, baseService, authService){
	
	var base = baseService;
	var self = this;

	self.getRegistros = function(){
		var data = {
			url: '/pedido/get/all'
		}

		var result = base.get(data);
		return result;
	}

	self.getRegistrosBySede = function(sedeId){
		var data = {
			url: '/pedido/get/all/' + sedeId
		}

		var result = base.get(data);
		return result;
	}

	self.getRegistrosByEmpleado = function(empleadoId){
		var data = {
			url: '/pedido/get/empleado/' + empleadoId
		}

		var result = base.get(data);
		return result;
	}

	self.postRegistro = function(params){
		var data = {
			url: '/pedido/post',
			params: params
		}

		var result = base.post(data);

		return result;
	}


	self.deleteRegistro = function(params){
		var data = {
			url: '/pedido/delete/' + params.id,
			params: {}
		}

		var result = base.delete(data);

		return result;
	}

	self.getDetalleRegistro = function(EmpleadoId){
		var data = {
			url: '/pedido/detalle/get/' + EmpleadoId
		}

		var result = base.get(data);
		return result;
	}

})