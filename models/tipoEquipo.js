
module.exports = function(sequelize, DataTypes){
	var tipoEquipo = sequelize.define('tipoEquipo', {
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
				tipoEquipo.hasOne(models.Tractor);
				tipoEquipo.hasMany(models.precioEquipo);
			}
		},
		freezeTableName: true,
		tableName: 'tipoEquipo'
	});

	return tipoEquipo;
}