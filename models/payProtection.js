
module.exports = function(sequelize, DataTypes){

	var payProtection = sequelize.define('payProtection',{
		fechaCobro: {
			DataTypes: DataTypes.DATEONLY,
			allowNull:true
		},
		monto:{
			type: DataTypes.DECIMAL(15,2),
			allowNull: true
		}
	},{
		classMethods: {
			associate: function(models){
				payProtection.belongsTo(models.Factura, {foreignKey: {allowNull: false}});
				payProtection.belongsTo(models.Cliente, {foreignKey: {allowNull: false}});
			}
		},
		freezeTableName: true,
		tableName: 'payProtection'
	})

	return payProtection;
}