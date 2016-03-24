
module.exports = function(sequelize, DataTypes){
	var estadoEquipo = sequelize.define('estadoEquipo', {
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
				estadoEquipo.hasOne(models.Tractor);
				estadoEquipo.hasMany(models.bitacoraTractor);
			}
		},
		freezeTableName: true,
		tableName: 'estadoEquipo'
	});

	return estadoEquipo;
}