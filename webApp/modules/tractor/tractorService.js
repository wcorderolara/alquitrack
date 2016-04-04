alquitrackApp.service('tractorService', function ($http, $q, baseService, authService){
	
	var base = baseService;
	var self = this;

	self.getRegistros = function(){
		var data = {
			url: '/tractor/get/all'
		}

		var result = base.get(data);
		return result;
	}

	self.getRegistrosBySede = function(sedeId){
		var data = {
			url: '/tractor/get/sede/' + sedeId
		}

		var result = base.get(data);
		return result;
	}	

	self.postRegistro = function(params){
		var data = {
			url: '/tractor/post',
			params: params
		}

		var result = base.post(data);

		return result;
	}

	self.putRegistro = function(params){
		var data = {
			url: '/tractor/put/' + params.id,
			params: params
		}

		var result = base.put(data);

		return result;
	}

	self.deleteRegistro = function(params){
		var data = {
			url: '/tractor/delete/' + params.id,
			params: {}
		}

		var result = base.delete(data);

		return result;
	}

	self.getTiposEquipo = function(){
		var data = {
			url: '/tipoEquipo/get/all'
		}

		var result = base.get(data);
		return result;
	}

	self.uploadImagen = function(file){		
		var data = {
			url: '/tractor/upload/avatar'
		}

		var result = base.uploadImage(data, file);

		return result;
	}

})