
module.exports = function(sequelize, DataTypes){
	var tipoAlquiler = sequelize.define('tipoAlquiler', {
		descripcion: {
			type: DataTypes.STRING,
			allowNull: false
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		},
		horasMinimas:{
			type: DataTypes.INTEGER,
			allowNull: true
		}
	},{
		classMethods: {
			associate: function(models){
				tipoAlquiler.hasMany(models.facturaDetalle);
				tipoAlquiler.hasMany(models.precioEquipo);
				tipoAlquiler.hasMany(models.reservaDetalle);
			}
		},
		freezeTableName: true,
		tableName: 'tipoAlquiler'
	});

	return tipoAlquiler;
}