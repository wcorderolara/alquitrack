
module.exports = function(sequelize, DataTypes){

	var empleadoDespedido = sequelize.define('empleadoDespedido',{
		fechaBaja: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		observaciones: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		imgDespido: {
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
				empleadoDespedido.belongsTo(models.Empleado, {foreignKey: {allowNull: false}});
			}
		},
		freezeTableName: true,
		tableName: 'empleadoDespedido'
	});

	return empleadoDespedido;
}