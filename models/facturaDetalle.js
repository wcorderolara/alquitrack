
module.exports = function(sequelize, DataTypes){

	var facturaDetalle = sequelize.define('facturaDetalle',{
		fechaSale: {
			DataTypes: DataTypes.DATEONLY,
			allowNull:true
		},
		fechaRegresa: {
			DataTypes: DataTypes.DATEONLY,
			allowNull:true
		},
		subTotal:{
			type: DataTypes.DECIMAL(15,2),
			allowNull: true
		}
	},{
		classMethods: {
			associate: function(models){
				detalleFactura.belongsTo(models.Factura, {foreignKey: {allowNull: false}});
				detalleFactura.belongsTo(models.Tractor, {foreignKey: {allowNull: false}});
				detalleFactura.belongsTo(models.tipoAlquiler, {foreignKey: {allowNull: false}});
			}
		},
		freezeTableName: true,
		tableName: 'facturaDetalle'
	})

	return facturaDetalle;
}