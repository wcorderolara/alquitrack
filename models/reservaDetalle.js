
module.exports = function(sequelize, DataTypes){

	var detalleReserva = sequelize.define('detalleReserva',{
		observacion: {
			type: DataTypes.STRING(1000),
			allowNull: true
		},
		status; {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}

	},{
		classMethods:{
			associate: function(models){
				detalleReserva.belongsTo(models.Reserva, {foreignKey: {allowNull:false}});
				detalleReserva.belongsTo(models.Tractor, {foreignKey: {allowNull:true}});
			}
		},
		freezeTableName: true,
		tableName: 'detalleReserva'
	})
}