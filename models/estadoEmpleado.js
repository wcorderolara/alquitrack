
module.exports = function(sequelize, DataTypes){
	var estadoEmpleado = sequelize.define('estadoEmpleado', {
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
				estadoEmpleado.hasOne(models.Empleado);
			}
		},
		freezeTableName: true,
		tableName: 'estadoEmpleado'
	});

	return estadoEmpleado;
}