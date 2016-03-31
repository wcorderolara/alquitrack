alquitrackApp.service('empleadoService', function ($http, $q, baseService, authService){
	
	var base = baseService;
	var self = this;

	self.getRegistros = function(){
		var data = {
			url: '/empleado/get/all'
		}

		var result = base.get(data);
		return result;
	}

	self.getRegistrosBySede = function(sedeId){
		var data = {
			url: '/empleado/get/sede/' + sedeId
		}

		var result = base.get(data);
		return result;
	}

	self.getTiposEmpleado = function(){
		var data = {
			url: '/tipoEmpleado/get/all'
		}

		var result = base.get(data);
		return result;
	}

	self.postRegistro = function(params){
		var data = {
			url: '/empleado/post',
			params: params
		}

		var result = base.post(data);

		return result;
	}

	self.putRegistro = function(params){
		var data = {
			url: '/empleado/put/' + params.id,
			params: params
		}

		var result = base.put(data);

		return result;
	}

	self.deleteRegistro = function(params){
		var data = {
			url: '/empleado/delete/' + params.id,
			params: {}
		}

		var result = base.delete(data);

		return result;
	}

})