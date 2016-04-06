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
			url: '/factura/get/all/' + sedeId
		}

		var result = base.get(data);
		return result;
	}

	self.postRegistro = function(params){
		var data = {
			url: '/factura/post',
			params: params
		}

		var result = base.post(data);

		return result;
	}


	self.deleteRegistro = function(params){
		var data = {
			url: '/factura/delete/' + params.id,
			params: {}
		}

		var result = base.delete(data);

		return result;
	}

	self.getDetalleRegistro = function(facturaId){
		var data = {
			url: '/factura/detalle/' + facturaId
		}

		var result = base.get(data);
		return result;
	}

	self.postCaja = function(params){
		var data = {
			url: '/caja/post',
			params: params
		}

		var result = base.post(data);
		return result;
	}

	self.postCuentaCorriente = function(params){
		var data = {
			url: '/cuentaCorriente/post',
			params: params
		}

		var result = base.post(data);
		return result;
	}

})