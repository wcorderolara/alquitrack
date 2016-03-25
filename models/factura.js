
module.exports = function(sequelize, DataTypes){

	var Factura = sequelize.define('Factura',{
		monto:{
			type: DataTypes.DECIMAL(15,2),
			allowNull: true
		},
		aceptoContrato: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		fechaCreacion:{
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		classMethods: {
			associate: function(models){
				Factura.belongsTo(models.Cliente, {foreignKey: {allowNull: false}});
				Factura.belongsTo(models.Pais, {foreignKey: {allowNull: false}});
				Factura.belongsTo(models.tipoPago, {foreignKey: {allowNull: false}});
				Factura.belongsTo(models.Empleado, {as: 'Vendedor', foreignKey: {name: 'vendedorId', field: 'vendedorId', allowNull:false}});
				Factura.belongsTo(models.Usuario,{foreignKey: {allowNull: false}});

				Factura.hasMany(models.facturaDetalle);
				Factura.hasMany(models.payProtection);
				Factura.hasMany(models.bitacoraTractor);
			}
		},
		freezeTableName: true,
		tableName: 'factura'
	})

	return Factura;
}