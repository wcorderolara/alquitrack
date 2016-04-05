
module.exports = function(sequelize, DataTypes){

	var cuentaCorriente = sequelize.define('cuentaCorriente',{
		saldoFactura:{
			type: DataTypes.DECIMAL(15,2),
			allowNull: true
		},
		diasCredito: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		fechaVencimiento: {
			type: DataTypes.DATE,
			allowNull:true
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}	
	},{
		classMethods: {
			associate: function(models){
				cuentaCorriente.belongsTo(models.Cliente, {foreignKey: {allowNull: true}});
				cuentaCorriente.belongsTo(models.Factura, {foreignKey: {allowNull: true}});				
			}
		},
		freezeTableName: true,
		tableName: 'cuentaCorriente'
	})

	return cuentaCorriente;
}