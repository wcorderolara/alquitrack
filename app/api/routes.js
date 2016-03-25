var express = require('express');
var router = express.Router();
var fs = require('fs');
// var middleware = require('../middlewares/middleware');
var jwt = require('express-jwt');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var auth = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload'
});
var controllers = {},
	controllers_path = process.cwd() + '/app/controllers';

fs.readdirSync(controllers_path).forEach(function (file){
	if(file.indexOf('.js') != -1){
		controllers[file.split('.')[0]] = require(controllers_path + '/' + file)
	}
})

var routesController = function(server){
	
}

module.exports = routesController;