
module.exports = function(sequelize, DataTypes){
	var tipoCredito = sequelize.define('tipoCredito', {
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
				tipoCredito.hasOne(models.Cliente);
			}
		},
		freezeTableName: true,
		tableName: 'tipoCredito'
	});

	return tipoCredito;
}