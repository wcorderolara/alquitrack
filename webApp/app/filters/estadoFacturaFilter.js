alquitrackApp.filter('estadoFacturaFilter', function(){
	return function (state){
		if(state == true){
			return '<i class="fa fa-circle warning"></i> Pendiente de Pago'
		}else{
			return '<i class="fa fa-circle success"></i> Cancelada'
		}
	}
})