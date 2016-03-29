alquitrackApp.service('baseService', function ($http, $q, alquitrackConf, Upload, authService){
	var uri = alquitrackConf.api.url;
	var self = this;

	self.get = function(data){
		var deferred = $q.defer();
		
		$http.get(uri + data.url, authService.setHeaders())
		.success(function (response){
			deferred.resolve(response);
		})
		.error(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}

	self.post = function(data){
		var deferred = $q.defer();

		$http.post(uri + data.url, data.params, authService.setHeaders())
		.success(function (response){
			deferred.resolve(response);
		})
		.error(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}

	self.put = function(data){
		var deferred = $q.defer();

		$http.post(uri + data.url, data.params, authService.setHeaders())
		.success(function (response){
			deferred.resolve(response);
		})
		.error(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}

	self.login = function(data){
		var deferred = $q.defer();

		$http.post(uri + data.url, data.params)
		.success(function (response, status, config){
			authService.saveToken(response.token);
			deferred.resolve(response);
		})
		.error(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}

	self.uploadImage = function(data){
		var deferred = $q.defer();

		file.upload = Upload.upload({
			url: uri + data.url,
			data: {file: data.file},
		});

		file.upload.then(function (response){
			deferred.resolve(response);
		}, function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}
})