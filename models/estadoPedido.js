
module.exports = function(sequelize, DataTypes){
	var estadoPedido = sequelize.define('estadoPedido', {
		descripcion: {
			type: DataTypes.STRING,
			allowNull: false
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		classMethods:{
			associate: function(models){
				estadoPedido.hasOne(models.Reserva);
			}
		},
		freezeTableName: true,
		tableName: 'estadoPedido'
	});

	return estadoPedido;
}