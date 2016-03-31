alquitrackApp.service('userService', function ($http, $q, baseService, authService){
	
	var base = baseService;
	var self = this;


	self.registrarUsuario = function(params){
		
		var data = {
			params: params,
			url: '/empleado/post'
		}

		var result = baseService.post(params);
		console.log(result);

		return result;

	}

	self.loginUser = function(params){

		var data = {
			params: params,
			url: '/login/user'
		}

		var result = baseService.login(data);

		return result;
	}

	this.getEmpleadoInfo = function(empId){
		var data = {
			url: '/empleado/get/' + empId
		}

		var result = baseService.get(data);

		return result;
	}

	this.getUsuarioInfo = function(userId){
		var data = {
			url: '/usuario/get/' + userId
		}

		var result = baseService.get(data);
		return result;
	}
})