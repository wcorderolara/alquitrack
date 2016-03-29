alquitrackApp.controller('userController', function($scope,$window, userService,ShareData,blockUI, authService){

	var service = userService;
	var auth = authService;
	var factory = ShareData;
	var userId = auth.getUserLogged();
	var empId = auth.getEmpleadoLogged();
	$scope.datosGenerales = {};

	if(!auth.isLoggedIn()){
		$window.location = "#/login";
		return false;
	}

	service.getEmpleadoInfo(empId).then(		
		function (data){
			blockUI.start();
			console.log(data);
			blockUI.stop();
		}
	)

	$scope.signOut = function(){
		auth.logout();
		$window.location = '#/login';
	}

})