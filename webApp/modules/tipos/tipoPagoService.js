alquitrackApp.service('tipoPagoService', function ($http, $q, baseService, authService){
	
	var base = baseService;
	var self = this;

	self.getRegistros = function(){
		var data = {
			url: '/tipoPago/get/all'
		}
		var result = base.get(data);
		return result;
	}

})