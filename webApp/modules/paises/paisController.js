alquitrackApp.controller('paisesController', function($scope, $window, $location,
											    paisService, ShareData, blockUI, Notification,
											    $modal){

	var service = paisService;
	
	$scope.listPaises = [];
	$scope.viewby = 10;
	$scope.totalItems = 0;
	$scope.currentPage = 1;
	$scope.itemsPerPage = $scope.viewby;
	$scope.maxSize = 5; //Number of pager buttons to show

	$scope.setItemsPerPage = function(num) {
		$scope.itemsPerPage = num;
		$scope.currentPage = 1; //reset to first paghe
	}

	$scope.getPaises = function(){
		service.getPaises().then(
			function (data){
				$scope.listPaises = data.data;
				$scope.totalItems = $scope.listPaises.length;
			}
		)
	}

	$scope.getPaises();

	$scope.openModal = function(action, model){
		var _model = model || {};
		var modalInstance = $modal.open({
			windowClass: '',
			templateUrl: 'crudForm.html',
			controller: 'crudPaisesController',
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
				$scope.getPaises();
			}
		})
	}

	$scope.delete = function(item){
		var _model = item;
		var modalInstance = $modal.open({
			windowClass: '',
			templateUrl: 'deleteRegistro.html',
			controller: 'deletePaisController',
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
				$scope.getPaises();
			}
		})
	}

})

alquitrackApp.controller('deletePaisController', function($scope, $modalInstance, model, paisService){
	var service = paisService;
	$scope.registro = model;

	$scope.deleteRegistro = function(){
		service.deletePais($scope.registro).then(
			function (response){
				$modalInstance.close(response);
			}
		)
	}

	$scope.cancel = function(){
    	$modalInstance.dismiss('cancel');
    }
})

alquitrackApp.controller('crudPaisesController', function ($scope, $modalInstance, action, model,
															paisService){
	var service = paisService;
	var state = action;
	$scope.title = state == 'nuevo' ? 'Crear nuevo Registro' : 'Editar Registro';
	$scope.textButton = state == 'nuevo' ? 'Agregar' : 'Editar';
	$scope.flag = model.flag || "";
	$scope.descripcion = model.descripcion || "";

	$scope.uploadPic = function(file, errFiles) {
	    service.uploadFlag(file).then(
	    	function (data){
	    		$scope.flag = data.data.data.url;
	    	}
	    )
    }

    $scope.postRegistro = function(){
    	$scope.formError = "";

    	if(!$scope.descripcion){
    		$scope.formError = "El nombre del pais es obligatorio";
    		return false;
    	}

    	if(state == 'nuevo'){
    		var params = {
    			descripcion: $scope.descripcion,
    			flag: $scope.flag
    		}
    		service.postPais(params).then(
    			function (response){
    				$modalInstance.close(response);
    			}
    		)
    	}else{
    		var params = {
    			id: model.id,
    			descripcion: $scope.descripcion,
    			flag: $scope.flag
    		}
    		service.putPais(params).then(
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