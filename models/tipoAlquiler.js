
module.exports = function(sequelize, DataTypes){
	var tipoAlquiler = sequelize.define('tipoAlquiler', {
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
				tipoAlquiler.hasMany(models.facturaDetalle);
				tipoAlquiler.hasMany(models.precioEquipo);
			}
		},
		freezeTableName: true,
		tableName: 'tipoAlquiler'
	});

	return tipoAlquiler;
}