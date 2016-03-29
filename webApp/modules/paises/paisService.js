alquitrackApp.service('paisService', function ($http, $q, baseService, authService){
	
	var base = baseService;
	var self = this;

	this.getPaises = function(){
		var data = {
			url: '/pais/get/all'
		}

		var result = baseService.get(data);
		return result;
	}

})