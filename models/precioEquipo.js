
module.exports = function(sequelize, DataTypes){

	var precioEquipo = sequelize.define('precioEquipo',{
		precio:{
			type: DataTypes.DECIMAL(15,2),
			allowNull: true
		}
	},{
		classMethods: {
			associate: function(models){
				precioEquipo.belongsTo(models.tipoEquipo, {foreignKey: {allowNull: false}});
				precioEquipo.belongsTo(models.tipoAlquiler, {foreignKey: {allowNull: false}});
				precioEquipo.belongsTo(models.Pais, {foreignKey: {allowNull: true}})
			}
		},
		freezeTableName: true,
		tableName: 'precioEquipo'
	})

	return precioEquipo;
}