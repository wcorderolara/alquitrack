alquitrackApp.service('userService', function ($http, $q, alquitrackConf, authService){
	var uri = alquitrackConf.api.url;

	this.getUserInfoById = function(userId){
		var deferred = $q.defer();

		$http.get(uri + '/usuario/get/clienteById/' + userId, authService.setHeaders())
		.success(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}
})