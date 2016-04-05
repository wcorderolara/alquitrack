
module.exports = function(sequelize, DataTypes){
	var Cliente = sequelize.define('Cliente',{
		nombre:{
			type: DataTypes.STRING,
			allowNull: false
		},
		apellido: {
			type: DataTypes.STRING,
			allowNull: false
		},
		numeroTributacion: {
			type: DataTypes.STRING,
			allowNull: false
		},
		numeroIdentificacion: {
			type: DataTypes.STRING,
			allowNull:true
		},
		direccion: {
			type: DataTypes.STRING(500),
			allowNull: false
		},
		telefono: {
			type: DataTypes.STRING(125),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: true
		},
		website:{
			type: DataTypes.STRING,
			allowNull: true
		},
		tieneCredito:{
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: false
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
			allowNull: false
		}
	},{
		classMethods: {
			associate: function(models){
				Cliente.belongsTo(models.tipoCliente, {foreignKey: {allowNull:false}});
				Cliente.belongsTo(models.Pais, {foreignKey: {allowNull:false}});
				Cliente.belongsTo(models.tipoCredito, {foreignKey: {allowNull: true}});
				Cliente.belongsTo(models.Sede, {foreignKey: {allowNull:false}});

				Cliente.hasMany(models.Factura);
				Cliente.hasMany(models.payProtection);
				Cliente.hasMany(models.Caja);
				Cliente.hasMany(models.cuentaCorriente);
				// Cliente.hasMany(models.reciboGenerado);
				Cliente.hasMany(models.Reserva);
				Cliente.hasMany(models.bitacoraTractor);
			}
		},
		freezeTableName: true,
		tableName: 'cliente'
	});

	return Cliente;
}