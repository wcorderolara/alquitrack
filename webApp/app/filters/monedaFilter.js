alquitrackApp.filter('monedaFilter', function(){
	return function (precio, simbolo){
		var price = simbolo + ' ' + precio;
		return price;
	}
})