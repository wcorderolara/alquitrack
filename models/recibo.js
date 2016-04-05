
module.exports = function(sequelize, DataTypes){

	var Recibo = sequelize.define('Recibo',{
		descripcion:{
			type: DataTypes.STRING(1500),
			allowNull: false
		},
		monto:{
			type: DataTypes.DECIMAL(15,2),
			allowNull: false
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		classMethods:{
			associate: function(models){
				Recibo.belongsTo(models.Factura, {foreignKey: {allowNull: true}})
				Recibo.belongsTo(models.Cliente, {foreignKey: {allowNull: true}})
				Recibo.belongsTo(models.tipoPago, {foreignKey: {allowNull: true}})
				Recibo.belongsTo(models.tipoOperacion, {foreignKey: {allowNull: true}})
			}
		},
		freezeTableName: true,
		tableName: 'recibo'
	});

	return Recibo;
}