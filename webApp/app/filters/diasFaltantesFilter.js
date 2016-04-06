alquitrackApp.filter('diasFaltantesFilter', function(){
	return function (fv,fc){
		var _fv = fv.substring(0,10);
		var _fc = fc.substring(0,10);

		var _dfv = _fv.split('-');
		var _dfc = _fc.split('-');

		var newfv = Date.UTC(_dfv[2],_dfv[1]-1,_dfv[0]);
		var newfc = Date.UTC(_dfc[2],_dfc[1]-1,_dfc[0]);

		//dias credito
		var difDiasCredito = newfv - newfc;
		var diasCredito = Math.floor(difDiasCredito / (1000 * 60 * 60 * 24) );

		var _today = moment(new Date()).format('YYYY-MM-DD').split('-');
		var newtoday = Date.UTC(_today[0],_today[1]-1,_today[2])

		//Calcula cuantos dias han pasado desde la creacion hasta el dia de hoy
		var difDiasHanPasado = newtoday - newfc;
		var diasHanPasado = Math.floor(difDiasHanPasado / (1000 * 60 * 60 * 24) );

		var porcentajeCredito = (diasHanPasado/diasCredito) * 100;

		if(porcentajeCredito < 60){
			return '<i class="fa fa-circle success"></i> En tiempo'
		}else if(porcentajeCredito > 60 || porcentajeCredito < 99){
			return '<i class="fa fa-circle warning"></i> Por Vencer Plazo'
		}else if(porcentajeCredito > 99 || porcentajeCredito == 100){
			return '<i class="fa fa-circle orange"></i> Plazo Vencido'
		}else if(porcentajeCredito > 100){
			return '<i class="fa fa-circle danger"></i> Fuera del Plazo'
		}
	}

})