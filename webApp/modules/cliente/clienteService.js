alquitrackApp.service('clienteService', function ($http, $q, baseService, authService){
	
	var base = baseService;
	var self = this;

	self.getRegistros = function(){
		var data = {
			url: '/cliente/get/all'
		}

		var result = base.get(data);
		return result;
	}

	self.getRegistrosBySede = function(sedeId){
		var data = {
			url: '/cliente/get/sede/' + sedeId
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
			url: '/cliente/post',
			params: params
		}

		var result = base.post(data);

		return result;
	}

	self.putRegistro = function(params){
		var data = {
			url: '/cliente/put/' + params.id,
			params: params
		}

		var result = base.put(data);

		return result;
	}

	self.deleteRegistro = function(params){
		var data = {
			url: '/cliente/delete/' + params.id,
			params: {}
		}

		var result = base.delete(data);

		return result;
	}

	self.getTiposCliente = function(){
		var data = {
			url: '/tipoCliente/get/all'
		}

		var result = base.get(data);
		return result;
	}

	self.getTiposCredito = function(){
		var data = {
			url: '/tipoCredito/get/all'
		}

		var result = base.get(data);
		return result;
	}

})