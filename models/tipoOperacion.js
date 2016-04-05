
module.exports = function(sequelize, DataTypes){
	var tipoOperacion = sequelize.define('tipoOperacion', {
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
				tipoOperacion.hasMany(models.Caja);
				tipoOperacion.hasMany(models.Recibo);
			}
		},
		freezeTableName: true,
		tableName: 'tipoOperacion'
	});

	return tipoOperacion;
}