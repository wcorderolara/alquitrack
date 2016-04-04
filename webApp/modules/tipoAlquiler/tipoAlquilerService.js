alquitrackApp.service('tipoAlquilerService', function ($http, $q, baseService, authService){
	
	var base = baseService;
	var self = this;

	self.getRegistros = function(){
		var data = {
			url: '/tipoAlquiler/get/all'
		}

		var result = base.get(data);
		return result;
	}

	self.getRegistrosByTractor = function(tipoEquipoid){
		var data = {
			url: '/tipoAlquiler/get/tractor/' + tipoEquipoid
		}

		var result = base.get(data);
		return result;
	}

	self.postRegistro = function(params){
		var data = {
			url: '/tipoAlquiler/post',
			params: params
		}

		var result = base.post(data);

		return result;
	}

	self.putRegistro = function(params){
		var data = {
			url: '/tipoAlquiler/put/' + params.id,
			params: params
		}

		var result = base.put(data);

		return result;
	}

	self.deleteRegistro = function(params){
		var data = {
			url: '/tipoAlquiler/delete/' + params.id,
			params: {}
		}

		var result = base.delete(data);

		return result;
	}

})