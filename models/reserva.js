
module.exports = function(sequelize, DataTypes){
	var Reserva = sequelize.define('Reserva', {
		observaciones: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		adelanto: {
			type: DataTypes.DECIMAL(15,2),
			allowNull: true
		},
		fechaReservacion: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		classMethods:{
			associate: function(models){
				Reserva.belongsTo(models.Cliente, {foreignKey: {allowNull: false}});
				Reserva.belongsTo(models.Sede, {foreignKey: {allowNull:false}});
				Reserva.belongsTo(models.estadoPedido, {foreignKey: {allowNull:true}});
				Reserva.belongsTo(models.Empleado, {foreignKey: {allowNull:true}});

				Reserva.hasMany(models.reservaDetalle);
			}
		},
		freezeTableName: true,
		tableName: 'reserva'
	});

	return Reserva;
}