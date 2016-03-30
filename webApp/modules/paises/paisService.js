alquitrackApp.service('paisService', function ($http, $q, baseService, authService){
	
	var base = baseService;
	var self = this;

	self.getPaises = function(){
		var data = {
			url: '/pais/get/all'
		}

		var result = base.get(data);
		return result;
	}

	self.postPais = function(params){
		var data = {
			url: '/pais/post',
			params: params
		}

		var result = base.post(data);

		return result;
	}

	self.putPais = function(params){
		var data = {
			url: '/pais/put/' + params.id,
			params: params
		}

		var result = base.put(data);

		return result;
	}

	self.deletePais = function(params){
		var data = {
			url: '/pais/delete/' + params.id,
			params: {}
		}

		var result = base.delete(data);

		return result;
	}

	self.uploadFlag = function(file){		
		var data = {
			url: '/pais/upload/flag'
		}

		var result = base.uploadImage(data, file);

		return result;
	}

})