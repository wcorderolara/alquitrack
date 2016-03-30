alquitrackApp.controller('tipoAlquilerController', function($scope, $window, $location,
											    tipoAlquilerService, ShareData, blockUI, Notification,
											    $modal){

	var service = tipoAlquilerService;
	
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

	$scope.getTiposAlquiler = function(){
		service.getRegistros().then(
			function (data){
				$scope.listItems = data.data;
				$scope.totalItems = $scope.listItems.length;
			}
		)
	}	

	$scope.getTiposAlquiler();

	$scope.openModal = function(action, model){
		var _model = model || {};
		var modalInstance = $modal.open({
			windowClass: '',
			templateUrl: 'crudForm.html',
			controller: 'crudTipoAlquilerController',
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
				$scope.getTiposAlquiler();
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
			controller: 'deleteTipoAlquilerController',
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
				$scope.getTiposAlquiler();
			}else{
				Notification.error(data.message);
				return false;
			}
		})
	}

})

alquitrackApp.controller('deleteTipoAlquilerController', function($scope, $modalInstance, model, tipoAlquilerService){
	var service = tipoAlquilerService;
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

alquitrackApp.controller('crudTipoAlquilerController', function ($scope, $modalInstance, action, model,
															tipoAlquilerService){
	var service = tipoAlquilerService;
	$scope.state = action;
	$scope.listPaises = [];
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