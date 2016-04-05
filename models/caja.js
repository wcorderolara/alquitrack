
module.exports = function(sequelize, DataTypes){

	var Caja = sequelize.define('Caja',{
		monto:{
			type: DataTypes.DECIMAL(15,2),
			allowNull: true
		},
		numeroCheque: {
			type: DataTypes.STRING,
			allowNull: true
		},
		fechaCobroCheque: {
			type: DataTypes.DATE,
			allowNull:true
		}		
	},{
		classMethods: {
			associate: function(models){
				Caja.belongsTo(models.tipoOperacion, {foreignKey: {allowNull: true}});
				Caja.belongsTo(models.tipoPago, {foreignKey: {allowNull: true}});
				Caja.belongsTo(models.Cliente, {foreignKey: {allowNull: true}});
				Caja.belongsTo(models.Factura, {foreignKey: {allowNull: true}});				
			}
		},
		freezeTableName: true,
		tableName: 'caja'
	})

	return Caja;
}