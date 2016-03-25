
module.exports = function(sequelize, DataTypes){
	var bitacoraTractor = sequelize.define('bitacoraTractor', {
		fechaFactura: {
			type: DataTypes.DATEONLY,
			allowNull: true
		},
		observaciones: {
			type: DataTypes.STRING,
			allowNull: true
		},		
		montoFactura: {
			type: DataTypes.DECIMAL(15,2),
			allowNull: true
		}
	},{
		classMethods:{
			associate: function(models){
				bitacoraTractor.belongsTo(models.Tractor, {foreignKey: {allowNull: true}});
				bitacoraTractor.belongsTo(models.estadoEquipo, {foreignKey: {allowNull: true}});
				bitacoraTractor.belongsTo(models.Cliente, {foreignKey: {allowNull: true}});
				bitacoraTractor.belongsTo(models.Factura, {foreignKey: {allowNull: true}});
			}
		},
		freezeTableName: true,
		tableName: 'bitacoraTractor'
	});

	return bitacoraTractor;
}