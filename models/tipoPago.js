
module.exports = function(sequelize, DataTypes){
	var tipoPago = sequelize.define('tipoPago', {
		descripcion: {
			type: DataTypes.STRING,
			allowNull: false
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		classMethods: {
			associate: function(models){
				tipoPago.hasMany(models.Factura);
			}
		},
		freezeTableName: true,
		tableName: 'tipoPago'
	});

	return tipoPago;
}