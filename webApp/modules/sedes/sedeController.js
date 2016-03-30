alquitrackApp.controller('sedesController', function($scope, $window, $location,
											    sedeService, ShareData, blockUI, Notification,
											    $modal){

	var service = sedeService;
	
	$scope.listSedes = [];
	$scope.viewby = 10;
	$scope.totalItems = 0;
	$scope.currentPage = 1;
	$scope.itemsPerPage = $scope.viewby;
	$scope.maxSize = 5; //Number of pager buttons to show

	$scope.setItemsPerPage = function(num) {
		$scope.itemsPerPage = num;
		$scope.currentPage = 1; //reset to first paghe
	}

	$scope.getSedes = function(){
		service.getRegistros().then(
			function (data){
				$scope.listSedes = data.data;
				$scope.totalItems = $scope.listSedes.length;
			}
		)
	}	

	$scope.getSedes();

	$scope.openModal = function(action, model){
		var _model = model || {};
		var modalInstance = $modal.open({
			windowClass: '',
			templateUrl: 'crudForm.html',
			controller: 'crudSedeController',
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
				$scope.getSedes();
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
			controller: 'deleteSedeController',
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
				$scope.getSedes();
			}else{
				Notification.error(data.message);
				return false;
			}
		})
	}

})

alquitrackApp.controller('deleteSedeController', function($scope, $modalInstance, model, sedeService){
	var service = sedeService;
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

alquitrackApp.controller('crudSedeController', function ($scope, $modalInstance, action, model,
															paisService, sedeService){
	var service = sedeService;
	var pais = paisService;
	var state = action;
	$scope.listPaises = [];
	$scope.title = state == 'nuevo' ? 'Crear nuevo Registro' : 'Editar Registro';
	$scope.textButton = state == 'nuevo' ? 'Agregar' : 'Editar';
	$scope.descripcion = model.descripcion || "";
	$scope.PaiId = state == 'nuevo' ? "" : model.Pai.id;

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

    	if(!$scope.descripcion || !$scope.PaiId){
    		$scope.formError = "Todos los campos son obligatorios";
    		return false;
    	}

    	if(state == 'nuevo'){
    		var params = {
    			descripcion: $scope.descripcion,
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
    			descripcion: $scope.descripcion,
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