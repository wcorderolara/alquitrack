
module.exports = function(sequelize, DataTypes){

	var Empleado = sequelize.define('empleado',{
		nombre:{
			type: DataTypes.STRING,
			allowNull: false
		},
		apellido: {
			type: DataTypes.STRING,
			allowNull: false
		},
		telefono:{
			type: DataTypes.STRING,
			allowNull: false
		},
		direccion: {
			type: DataTypes.STRING,
			allowNull: false
		},
		fechaNacimiento: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		fotografia: {
			type: DataTypes.STRING(500),
			allowNull: true
		},
		fechaBaja: {
			type: DataTypes.DATEONLY,
			allowNull: true
		}
	},{
		classMethods: {
			associate: function(modes){
				Empleado.belongsTo(models.Pais, {foreignKey: {allowNull: false}});
				Empleado.belongsTo(models.tipoEmpleado, {foreignKey: {allowNull: false}});
				Empleado.belognsTo(models.estadoEmpleado, {foreignKey: {allowNull: false}});

				Empleado.hasMany(models.Usuario);
				Empleado.hasMany(models.Factura);
				// Empleado.hasMany(models.RutaCobro);
			}
		},
		freezeTableName: true,
		tableName: 'empleado'
	});

	return Empleado;
}