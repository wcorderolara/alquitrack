
module.exports = function(sequelize, DataTypes){
	var moduloRol = sequelize.define('moduloRol', {
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		freezeTableName: true
	});

	return moduloRol;
}