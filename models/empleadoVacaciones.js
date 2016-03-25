
module.exports = function(sequelize, DataTypes){

	var empleadoVacaciones = sequelize.define('empleadoVacaciones',{
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
		imgVacaciones: {
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
				empleadoVacaciones.belongsTo(models.Empleado, {foreignKey: {allowNull: false}});
			}
		},
		freezeTableName: true,
		tableName: 'empleadoVacaciones'
	});

	return empleadoVacaciones;
}