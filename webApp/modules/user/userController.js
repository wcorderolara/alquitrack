alquitrackApp.controller('userController', function($scope,$window, userService,ShareData,blockUI, authService){

	var service = userService;
	var auth = authService;
	var factory = ShareData;
	var userId = auth.getUserLogged();
	var empId = auth.getEmpleadoLogged();
	var datosGenerales = {};

	if(!auth.isLoggedIn()){
		$window.location = "#/login";
		return false;
	}

	service.getEmpleadoInfo(empId).then(		
		function (data){
			blockUI.start();
			datosGenerales = data.data;
			console.log(data);
			factory.value = {
				tipoEmpleado: datosGenerales.tipoEmpleado.descripcion,
				paisId: datosGenerales.PaiId.id,
				SedeId: datosGenerales.Sede.id,
				Sede: datosGenerales.Sede.descripcion
			}
			blockUI.stop();
		}
	)

	$scope.signOut = function(){
		auth.logout();
		$window.location = '#/login';
	}

})