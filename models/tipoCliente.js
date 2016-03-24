
module.exports = function(sequelize, DataTypes){
	var tipoCliente = sequelize.define('tipoCliente', {
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
				tipoCliente.hasOne(models.Cliente);
			}
		},
		freezeTableName: true,
		tableName: 'tipoCliente'
	});

	return tipoCliente;
}