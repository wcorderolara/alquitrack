
module.exports = function(sequelize, DataTypes){

	var tallerTractor = sequelize.define('tallerTractor',{
		motivo: {
			type: DataTypes.STRING(150),
			allowNull: true
		},
		observacion: {
			type: DataTypes.STRING(2500),
			allowNull: true
		},
		fechaIngreso: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		fechaSalida: {
			type: DataTypes.DATEONLY,
			allowNull: true
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}

	},{
		classMethods:{
			associate: function(models){
				tallerTractor.belongsTo(models.Tractor, {foreignKey: {allowNull:true}});
			}
		},
		freezeTableName: true,
		tableName: 'tallerTractor'
	})

	return tallerTractor;
}