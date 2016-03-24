
module.exports = function(sequelize, DataTypes){
	var paginaModulo = sequelize.define('paginaModulo', {
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		freezeTableName: true
	});

	return paginaModulo;
}