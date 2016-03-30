alquitrackApp.controller('tipoEquipoController', function($scope, $window, $location,
											    tipoEquipoService, ShareData, blockUI, Notification,
											    $modal){

	var service = tipoEquipoService;
	
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

	$scope.getTipoEquipo = function(){
		service.getRegistros().then(
			function (data){
				$scope.listItems = data.data;
				$scope.totalItems = $scope.listItems.length;
			}
		)
	}	

	$scope.getTipoEquipo();

	$scope.openModal = function(action, model){
		var _model = model || {};
		var modalInstance = $modal.open({
			windowClass: '',
			templateUrl: 'crudForm.html',
			controller: 'crudTipoEquipoController',
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
				$scope.getTipoEquipo();
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
			controller: 'deleteTipoEquipoController',
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
				$scope.getTipoEquipo();
			}else{
				Notification.error(data.message);
				return false;
			}
		})
	}

})

alquitrackApp.controller('deleteTipoEquipoController', function($scope, $modalInstance, model, tipoEquipoService){
	var service = tipoEquipoService;
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

alquitrackApp.controller('crudTipoEquipoController', function ($scope, $modalInstance, action, model,
															tipoEquipoService){
	var service = tipoEquipoService;
	$scope.state = action;
	$scope.title = $scope.state == 'nuevo' ? 'Crear nuevo Registro' : 'Editar Registro';
	$scope.textButton = $scope.state == 'nuevo' ? 'Agregar' : 'Editar';
	$scope.descripcion = model.descripcion || "";

    $scope.postRegistro = function(){
    	$scope.formError = "";

    	if(!$scope.descripcion){
    		$scope.formError = "Todos los campos son obligatorios";
    		return false;
    	}

    	if($scope.state == 'nuevo'){
    		var params = {
    			descripcion: $scope.descripcion
    		}
    		service.postRegistro(params).then(
    			function (response){
    				$modalInstance.close(response);
    			}
    		)
    	}else{
    		var params = {
    			id: model.id,
    			descripcion: $scope.descripcion
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