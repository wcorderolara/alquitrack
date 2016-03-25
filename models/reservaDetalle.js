
module.exports = function(sequelize, DataTypes){

	var reservaDetalle = sequelize.define('reservaDetalle',{
		observacion: {
			type: DataTypes.STRING(1000),
			allowNull: true
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}

	},{
		classMethods:{
			associate: function(models){
				reservaDetalle.belongsTo(models.Reserva, {foreignKey: {allowNull:false}});
				reservaDetalle.belongsTo(models.Tractor, {foreignKey: {allowNull:true}});
			}
		},
		freezeTableName: true,
		tableName: 'reservaDetalle'
	})

	return reservaDetalle;
}