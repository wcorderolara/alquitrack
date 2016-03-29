alquitrackApp.controller('paisesController', function($scope, $window, $location,
											    paisService, ShareData, blockUI, Notification){

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

	service.getPaises().then(
		function (data){
			$scope.listPaises = data.data;
			$scope.totalItems = $scope.listPaises.length;
		}
	)

	$scope.edit = function(item){
		console.log('editar');
		console.log(item.id);
	}

	$scope.delete = function(item){
		console.log('eliminar');
		console.log(item.id);
	}

})