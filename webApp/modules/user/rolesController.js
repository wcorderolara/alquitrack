alquitrackApp.controller('rolesController', function($scope,$window, userService,ShareData,blockUI, authService){

	var service = userService;
	var auth = authService;
	var factory = ShareData;
	var userId = auth.getUserLogged();
	var empId = auth.getEmpleadoLogged();
	var datosGenerales = {};


	service.getUsuarioInfo(userId).then(
		function (data){
			console.log('usuario Informacion');
			console.log(data);
			datosGenerales = data.data;
			factory.value = {
				rol: datosGenerales.Rol.descripcion,
				paisId: datosGenerales.Empleado.PaiId,
				SedeId: datosGenerales.Empleado.SedeId,
				Sede: datosGenerales.Empleado.Sede.descripcion
			}
			
		}
	)


})