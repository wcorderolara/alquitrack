alquitrackApp.service('tipoOperacionService', function ($http, $q, baseService, authService){
	
	var base = baseService;
	var self = this;

	self.getRegistrosFactura = function(){
		var data = {
			url: '/tipoOperacion/get/factura'

		var result = base.get(data);
		return result;
	}

	self.getRegistrosAbono = function(){
		var data = {
			url: '/tipoOperacion/get/abono'
		}

		var result = base.get(data);
		return result;
	}

	

})