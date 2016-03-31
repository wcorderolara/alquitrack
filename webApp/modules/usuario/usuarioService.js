alquitrackApp.service('usuarioService', function ($http, $q, baseService, authService){
	
	var base = baseService;
	var self = this;

	self.getRegistros = function(){
		var data = {
			url: '/usuario/get/all'
		}

		var result = base.get(data);
		return result;
	}

	self.getRegistrosBySede = function(sedeId){
		var data = {
			url: '/usuario/get/sede/' + sedeId
		}

		var result = base.get(data);
		return result;
	}

	self.getEmpleados = function(){
		var data = {
			url: '/empleado/get/all'
		}

		var result = base.get(data);
		return result;
	}

	self.getEmpleadosBySede = function(sedeId){
		var data = {
			url: '/empleado/get/sede/' + sedeId
		}

		var result = base.get(data);
		return result;
	}

	self.postRegistro = function(params){
		var data = {
			url: '/usuario/post',
			params: params
		}

		var result = base.post(data);

		return result;
	}

	self.putRegistro = function(params){
		var data = {
			url: '/usuario/put/' + params.id,
			params: params
		}

		var result = base.put(data);

		return result;
	}

	self.deleteRegistro = function(params){
		var data = {
			url: '/usuario/delete/' + params.id,
			params: {}
		}

		var result = base.delete(data);

		return result;
	}

	self.getRoles = function(){
		var data = {
			url: '/rol/get/all'
		}

		var result = base.get(data);
		return result;
	}

	self.getTiposUsuario = function(){
		var data = {
			url: '/tipoUsuario/get/all'
		}

		var result = base.get(data);
		return result;
	}

})