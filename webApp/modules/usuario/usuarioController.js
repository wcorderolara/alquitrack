alquitrackApp.controller('usuarioController', function($scope, $window, $location,
											    usuarioService, ShareData, blockUI, Notification,
											    $modal){

	var service = usuarioService;
	var factory = ShareData;
	var info = factory.value;

	$scope.listItems = [];
	$scope.viewby = 10;
	$scope.totalItems = 0;
	$scope.currentPage = 1;
	$scope.itemsPerPage = $scope.viewby;
	$scope.maxSize = 5; //Number of pager buttons to show

	$scope.setItemsPerPage = function(num) {
		$scope.itemsPerPage = num;
		$scope.currentPage = 1; //reset to first paghe
	}

	$scope.getUsuarios = function(){

		if(info.rol == 'Administrador'){	
			service.getRegistros().then(
				function (data){
					$scope.listItems = data.data;
					$scope.totalItems = $scope.listItems.length;
				}
			)
		}else{
			service.getRegistrosBySede(info.SedeId).then(
				function (data){
					$scope.listItems = data.data;
					$scope.totalItems = $scope.listItems.length;
				}
			)
		}
	}		

	$scope.getUsuarios();

	$scope.openModal = function(action, model){
		var _model = model || {};
		var modalInstance = $modal.open({
			windowClass: '',
			templateUrl: 'crudForm.html',
			controller: 'crudUsuarioController',
			size: 'md',
			resolve: {
				action: function(){
					return action;
				},
				model: function(){
					return _model;
				},
				objInfo: function(){
					return info
				}
			}
		});

		modalInstance.result.then(function (data){
			if(data.type){
				Notification.success(data.message);
				$scope.getUsuarios();
			}else{
				Notification.error(data.message);
				return false;
			}
		})
	}

	$scope.delete = function(item){
		var _model = item;
		var modalInstance = $modal.open({
			windowClass: '',
			templateUrl: 'deleteRegistro.html',
			controller: 'deleteUsuarioController',
			size: 'md',
			resolve: {				
				model: function(){
					return _model;
				}
			}
		});

		modalInstance.result.then(function (data){
			if(data.type){
				Notification.success(data.message);
				$scope.getUsuarios();
			}else{
				Notification.error(data.message);
				return false;
			}
		})
	}

})

alquitrackApp.controller('deleteUsuarioController', function($scope, $modalInstance, model, usuarioService){
	var service = usuarioService;
	$scope.registro = model;

	$scope.deleteRegistro = function(){
		service.deleteRegistro($scope.registro).then(
			function (response){
				$modalInstance.close(response);
			}
		)
	}

	$scope.cancel = function(){
    	$modalInstance.dismiss('cancel');
    }
})

alquitrackApp.controller('crudUsuarioController', function ($scope, $modalInstance, action, model, objInfo,
															usuarioService, empleadoService){
	var service = usuarioService;
	var empleadoService = empleadoService;
	var info = objInfo;

	$scope.listEmpleados = [];
	$scope.listTipoUsuario = [];
	$scope.listRoles = [];
	$scope.empleadoSelected = ""

	$scope.state = action;
	$scope.title = $scope.state == 'nuevo' ? 'Crear nuevo Registro' : 'Editar Registro';
	$scope.textButton = $scope.state == 'nuevo' ? 'Agregar' : 'Editar';

	$scope.userLogin = model.userLogin || "";
	$scope.password = "";
	$scope.EmpleadoId = model.EmpleadoId || "";
	$scope.tipoUsuarioId = $scope.state == 'nuevo' ? "" : model.tipoUsuarioId;
	$scope.RolId = $scope.state == 'nuevo' ? "" : model.RolId;

	service.getRoles().then(
		function (data){
			$scope.listRoles = data.data;
		}
	)

	service.getTiposUsuario().then(
		function (data){
			$scope.listTipoUsuario = data.data;
		}
	)

	$scope.getEmpleados = function(){
		if(info.rol == 'Administrador'){	
			service.getEmpleados().then(
				function (data){
					var data = data.data;
					for(item in data){
						$scope.listEmpleados.push(data[item].id + '-' + data[item].nombre + ' ' + data[item].apellido);
					}
				}
			)
		}else{
			service.getEmpleadosBySede(info.SedeId).then(
				function (data){
					var data = data.data;
					for(item in data){
						$scope.listEmpleados.push(data[item].id + '-' + data[item].nombre + ' ' + data[item].apellido);
					}
				}
			)
		}
	}

	$scope.getEmpleados();

	$scope.getInfoEmpleado = function(item){
		var _item = item.split('-');
		$scope.EmpleadoId = _item[0];
	}
	
    $scope.postRegistro = function(){
    	$scope.formError = "";

    	if(!$scope.userLogin || !$scope.password || !$scope.RolId || !$scope.tipoUsuarioId || !$scope.EmpleadoId){
    		$scope.formError = "Todos los campos son obligatorios";
    		return false;
    	}

    	if($scope.state == 'nuevo'){

    		var params = {
    			userLogin: $scope.userLogin,
				password: $scope.password,
				EmpleadoId: $scope.EmpleadoId,
				tipoUsuarioId: $scope.tipoUsuarioId,
				RolId: $scope.RolId
    		}
    		service.postRegistro(params).then(
    			function (response){
    				$modalInstance.close(response);
    			}
    		)
    	}
    }

    $scope.cancel = function($event){
    	$event.preventDefault();
		$event.stopPropagation();

    	$modalInstance.dismiss('cancel');
    }

})