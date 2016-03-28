alquitrackApp.service('baseService', function ($http, $q, alquitrackConf, Upload, authService){
	var uri = alquitrackConf.api.url;
	var self = this;

	self.get = function(url){
		var deferred = $q.defer();
		
		$http.get(uri + url, authService.setHeaders())
		.success(function (response){
			deferred.resolve(response);
		})
		.error(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}

	self.post = function(url, params){
		var deferred = $q.defer();

		$http.post(uri + url, params, authService.setHeaders())
		.success(function (response){
			deferred.resolve(response);
		})
		.error(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}

	self.put = function(url, params){
		var deferred = $q.defer();

		$http.post(uri + url, params, authService.setHeaders())
		.success(function (response){
			deferred.resolve(response);
		})
		.error(function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}

	self.uploadImage = function(url, file){
		var deferred = $q.defer();

		file.upload = Upload.upload({
			url: uri + url,
			data: {file: file},
		});

		file.upload.then(function (response){
			deferred.resolve(response);
		}, function (response){
			deferred.resolve(response);
		})

		return deferred.promise;
	}
})