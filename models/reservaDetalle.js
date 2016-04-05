
module.exports = function(sequelize, DataTypes){

	var reservaDetalle = sequelize.define('reservaDetalle',{
		observacion: {
			type: DataTypes.STRING(1000),
			allowNull: true
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		},
		fechaSale:{
	        type: DataTypes.DATEONLY,
	        allowNull: true
	   	},
	   	fechaRegresa:{
	   		type: DataTypes.DATEONLY,
        	allowNull: true
	   	},
	   	subTotal:{
	   		type: DataTypes.DECIMAL(15,2),
	   		allowNull: true
	   	},
	   	cantidadHoras: {
	   		type: DataTypes.INTEGER,
	   		allowNull: true
	   	}

	},{
		classMethods:{
			associate: function(models){
				reservaDetalle.belongsTo(models.Reserva, {foreignKey: {allowNull:false}});
				reservaDetalle.belongsTo(models.Tractor, {foreignKey: {allowNull:true}});
				reservaDetalle.belongsTo(models.tipoAlquiler, {foreignKey: {allowNull:true}});
			}
		},
		freezeTableName: true,
		tableName: 'reservaDetalle'
	})

	return reservaDetalle;
}