alquitrackApp.controller('empleadoController', function($scope, $window, $location,
											    empleadoService, ShareData, blockUI, Notification,
											    $modal){

	var service = empleadoService;
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

	$scope.getEmpleados = function(){

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

	$scope.getEmpleados();

	$scope.openModal = function(action, model){
		var _model = model || {};
		var modalInstance = $modal.open({
			windowClass: '',
			templateUrl: 'crudForm.html',
			controller: 'crudEmpleadoController',
			size: 'md',
			resolve: {
				action: function(){
					return action;
				},
				model: function(){
					return _model;
				}
			}
		});

		modalInstance.result.then(function (data){
			if(data.type){
				Notification.success(data.message);
				$scope.getEmpleados();
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
			controller: 'deleteEmpleadoController',
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
				$scope.getEmpleados();
			}else{
				Notification.error(data.message);
				return false;
			}
		})
	}

})

// alquitrackApp.directive('estadoEmpleado', function(){
// 	return {
// 		restrict: 'EA',
// 		controller: 'empleadoController',
// 		scope:{
// 			estadoInfo: '=estado'
// 		},
// 		template: '<i class="fa fa-circle {{estadoInfo}}"></i>'
// 	}
// })

alquitrackApp.controller('deleteEmpleadoController', function($scope, $modalInstance, model, empleadoService){
	var service = empleadoService;
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

alquitrackApp.controller('crudEmpleadoController', function ($scope, $modalInstance, action, model,
															empleadoService, paisService, sedeService){
	var service = empleadoService;
	var paisService = paisService;
	var sedeService = sedeService;

	$scope.listPaises = [];
	$scope.listSedes = [];

	$scope.state = action;
	$scope.title = $scope.state == 'nuevo' ? 'Crear nuevo Registro' : 'Editar Registro';
	$scope.textButton = $scope.state == 'nuevo' ? 'Agregar' : 'Editar';
	
	$scope.nombre = model.nombre || "";
	$scope.apellido = model.apelido || "";
	$scope.telefono = model.telefono || "";
	$scope.direccion = model.direccion || "";
	$scope.fechaNacimiento = model.fechaNacimiento  || "";
	$scope.fotografia = model.fotografia || "";
	$scope.PaiId = $scope.state == 'nuevo' ? "" : model.PaiId;
	$scope.tipoEmpleadoId = $scope.state == 'nuevo' ? "" : model.tipoEmpleadoId;
	$scope.SedeId = $scope.state == 'nuevo' ? "" : model.SedeId;

	paisService.getPaises().then(
		function (data){
			$scope.listPaises = data.data;
		}
	)

	$scope.getSedes = function(PaiId){
		sedeService.getRegistroByPais(paiId).then(
			function (data){
				$scope.listSedes = data.data;
			}
		)
	}
	
    $scope.postRegistro = function(){
    	$scope.formError = "";

    	if(!$scope.precio || !$scope.tipoEquipoId || !$scope.tipoAlquilerId || !$scope.PaiId){
    		$scope.formError = "Todos los campos son obligatorios";
    		return false;
    	}

    	if($scope.state == 'nuevo'){
    		var params = {
    			precio: $scope.precio,
    			tipoEquipoId: $scope.tipoEquipoId,
    			tipoAlquilerId: $scope.tipoAlquilerId,
    			PaiId: $scope.PaiId
    		}
    		service.postRegistro(params).then(
    			function (response){
    				$modalInstance.close(response);
    			}
    		)
    	}else{
    		var params = {
    			id: model.id,
    			precio: $scope.precio,
    			tipoEquipoId: $scope.tipoEquipoId,
    			tipoAlquilerId: $scope.tipoAlquilerId,
    			PaiId: $scope.PaiId
    		}
    		service.putRegistro(params).then(
    			function (response){
    				$modalInstance.close(response);
    			}
    		)
    	}
    }

    $scope.cancel = function(){
    	$modalInstance.dismiss('cancel');
    }

})