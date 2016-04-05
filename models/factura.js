
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
		},
		correlativo: {
			type:DataTypes.BIGINT(11),
			allowNull: true
		}
	},{
		classMethods: {
			associate: function(models){
				Factura.belongsTo(models.Cliente, {foreignKey: {allowNull: false}});
				Factura.belongsTo(models.Pais, {foreignKey: {allowNull: false}});
				Factura.belongsTo(models.tipoPago, {foreignKey: {allowNull: false}});
				Factura.belongsTo(models.Empleado, {foreignKey: {allowNull: false}});
				Factura.belongsTo(models.Usuario,{foreignKey: {allowNull: false}});
				Factura.belongsTo(models.Sede, {foreignKey: {allowNull:false}});

				Factura.hasMany(models.facturaDetalle);
				Factura.hasMany(models.payProtection);
				Factura.hasMany(models.bitacoraTractor);
				Factura.hasMany(models.Caja);
				Factura.hasMany(models.cuentaCorriente);
			}
		},
		freezeTableName: true,
		tableName: 'factura'
	})

	return Factura;
}