
module.exports = function(sequelize, DataTypes){

	var facturaDetalle = sequelize.define('facturaDetalle',{
		fechaSale: {
			type: DataTypes.DATEONLY,
			allowNull:true
		},
		fechaRegresa: {
			type: DataTypes.DATEONLY,
			allowNull:true
		},
		subTotal:{
			type: DataTypes.DECIMAL(15,2),
			allowNull: true
		}
	},{
		classMethods: {
			associate: function(models){
				facturaDetalle.belongsTo(models.Factura, {foreignKey: {allowNull: false}});
				facturaDetalle.belongsTo(models.Tractor, {foreignKey: {allowNull: false}});
				facturaDetalle.belongsTo(models.tipoAlquiler, {foreignKey: {allowNull: false}});
			}
		},
		freezeTableName: true,
		tableName: 'facturaDetalle'
	})

	return facturaDetalle;
}