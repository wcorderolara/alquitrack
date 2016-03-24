
module.exports = function(sequelize, DataTypes){
	var tipoEmpleado = sequelize.define('tipoEmpleado', {
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
				tipoEmpleado.hasOne(models.Empleado);
			}
		},
		freezeTableName: true,
		tableName: 'tipoEmpleado'
	});

	return tipoEmpleado;
}