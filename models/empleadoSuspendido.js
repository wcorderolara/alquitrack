
module.exports = function(sequelize, DataTypes){

	var empleadoSuspendido = sequelize.define('empleadoSuspendido',{
		fechaDesde: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		fechaHasta: {
			type: DataTypes.DATEONLY,
			allowNull: true
		},
		observaciones: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		imgSuspension: {
			type:DataTypes.STRING,
			allowNull: true
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		classMethods: {
			associate: function(models){
				empleadoSuspendido.belongsTo(models.Empleado, {foreignKey: {allowNull: false}});
			}
		},
		freezeTableName: true,
		tableName: 'empleadoSuspendido'
	});

	return empleadoSuspendido;
}