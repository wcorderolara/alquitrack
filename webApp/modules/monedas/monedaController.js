alquitrackApp.controller('monedasController', function($scope, $window, $location,
											    monedaService, ShareData, blockUI, Notification,
											    $modal){

	var service = monedaService;
	
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

	$scope.getMonedas = function(){
		service.getRegistros().then(
			function (data){
				$scope.listItems = data.data;
				$scope.totalItems = $scope.listItems.length;
			}
		)
	}	

	$scope.getMonedas();

	$scope.openModal = function(action, model){
		var _model = model || {};
		var modalInstance = $modal.open({
			windowClass: '',
			templateUrl: 'crudForm.html',
			controller: 'crudMonedaController',
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
				$scope.getMonedas();
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
			controller: 'deleteMonedaController',
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
				$scope.getMonedas();
			}else{
				Notification.error(data.message);
				return false;
			}
		})
	}

})

alquitrackApp.controller('deleteMonedaController', function($scope, $modalInstance, model, monedaService){
	var service = monedaService;
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

alquitrackApp.controller('crudMonedaController', function ($scope, $modalInstance, action, model,
															paisService, monedaService){
	var service = monedaService;
	var pais = paisService;
	$scope.state = action;
	$scope.listPaises = [];
	$scope.title = $scope.state == 'nuevo' ? 'Crear nuevo Registro' : 'Editar Registro';
	$scope.textButton = $scope.state == 'nuevo' ? 'Agregar' : 'Editar';
	$scope.descripcion = model.descripcion || "";
	$scope.simbolo = model.simbolo || "";
	$scope.paisId = $scope.state == 'nuevo' ? "" : model.Pai.id;

	$scope.getPaises = function(){
		pais.getPaises().then(
			function (data){
				$scope.listPaises = data.data;
			}
		)
	}

	$scope.getPaises();

    $scope.postRegistro = function(){
    	$scope.formError = "";

    	if(!$scope.descripcion || !$scope.simbolo || !$scope.paisId){
    		$scope.formError = "Todos los campos son obligatorios";
    		return false;
    	}

    	if($scope.state == 'nuevo'){
    		var params = {
    			descripcion: $scope.descripcion,
    			simbolo: $scope.simbolo,
    			paisId: $scope.paisId
    		}
    		service.postRegistro(params).then(
    			function (response){
    				$modalInstance.close(response);
    			}
    		)
    	}else{
    		var params = {
    			id: model.id,
    			descripcion: $scope.descripcion,
    			simbolo: $scope.simbolo,
    			paisId: $scope.paisId
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