
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
			allowNull: true
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		},
		correlativo: {
			type:DataTypes.BIGINT(11),
			allowNull: true
		}
	},{
		classMethods: {
			associate: function(models){
				Factura.belongsTo(models.Cliente, {foreignKey: {allowNull: true}});
				Factura.belongsTo(models.Pais, {foreignKey: {allowNull: true}});
				Factura.belongsTo(models.tipoPago, {foreignKey: {allowNull: true}});
				Factura.belongsTo(models.tipoOperacion, {foreignKey: {allowNull: true}});
				Factura.belongsTo(models.Empleado, {foreignKey: {allowNull: true}});
				Factura.belongsTo(models.Usuario,{foreignKey: {allowNull: true}});
				Factura.belongsTo(models.Sede, {foreignKey: {allowNull:true}});

				Factura.hasMany(models.facturaDetalle);
				Factura.hasMany(models.payProtection);
				Factura.hasMany(models.bitacoraTractor);
				Factura.hasMany(models.Caja);
				Factura.hasMany(models.cuentaCorriente);
				Factura.hasMany(models.Recibo);
			}
		},
		freezeTableName: true,
		tableName: 'factura'
	})

	return Factura;
}