alquitrackApp.controller('correlativosFacturaController', function($scope, $window, $location,
											    correlativosFacturaService, ShareData, blockUI, Notification,
											    $modal){

	var service = correlativosFacturaService;
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

	$scope.getCorrelativosFactura = function(){
		service.getRegistros().then(
			function (data){
				console.log(data);
				$scope.listItems = data.data;
				$scope.totalItems = $scope.listItems.length;
			}
		)
	}	

	$scope.getCorrelativosFactura();

	$scope.openModal = function(action, model){
		var _model = model || {};
		var modalInstance = $modal.open({
			windowClass: '',
			templateUrl: 'crudForm.html',
			controller: 'crudCorrelativosFacturaController',
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
				$scope.getCorrelativosFactura();
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
			controller: 'deleteCorrelativosFacturaController',
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
				$scope.getCorrelativosFactura();
			}else{
				Notification.error(data.message);
				return false;
			}
		})
	}

})

alquitrackApp.controller('deleteCorrelativosFacturaController', function($scope, $modalInstance, model, correlativosFacturaService){
	var service = correlativosFacturaService;
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

alquitrackApp.controller('crudCorrelativosFacturaController', function ($scope, $modalInstance, action, model,
															correlativosFacturaService, paisService){
	var service = correlativosFacturaService;
	var paisService = paisService;

	$scope.listPaises = [];

	$scope.state = action;
	$scope.title = $scope.state == 'nuevo' ? 'Crear nuevo Registro' : 'Editar Registro';
	$scope.textButton = $scope.state == 'nuevo' ? 'Agregar' : 'Editar';
	
	$scope.serie = model.serie || "";
	$scope.resolucion = model.resolucion || "";
	$scope.cantidadAprobadas = model.cantidadAprobadas || "";
	$scope.PaiId = $scope.state == 'nuevo' ? "" : model.PaiId;

	paisService.getPaises().then(
		function (data){
			$scope.listPaises = data.data;
		}
	)

    $scope.postRegistro = function(){
    	$scope.formError = "";

    	if(!$scope.serie || !$scope.resolucion || !$scope.cantidadAprobadas || !$scope.PaiId){
    		$scope.formError = "Todos los campos son obligatorios";
    		return false;
    	}

    	if($scope.state == 'nuevo'){
    		var params = {
    			serie: $scope.serie,
    			resolucion: $scope.resolucion,
    			cantidadAprobadas: $scope.cantidadAprobadas,
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
    			serie: $scope.serie,
    			resolucion: $scope.resolucion,
    			cantidadAprobadas: $scope.cantidadAprobadas,
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