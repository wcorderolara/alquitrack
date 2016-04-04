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
				empleado: datosGenerales.EmpleadoId,
				rolId: datosGenerales.RolId,
				usuarioId: datosGenerales.id,
				rol: datosGenerales.Rol.descripcion,
				paisId: datosGenerales.Empleado.PaiId,
				monedaPais: datosGenerales.Empleado.Pai.monedaPai.simbolo,
				SedeId: datosGenerales.Empleado.SedeId,
				Sede: datosGenerales.Empleado.Sede.descripcion
			}
			
		}
	)


})