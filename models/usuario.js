
module.exports = function(sequelize, DataTypes){

	var Usuario = sequelize.define('Usuario', {
		userLogin: {
			type: DataTypes.STRING,
			allowNull: false
		},
		salt: {
			type: DataTypes.STRING,
			allowNull: true
		},
		hash: {
			type: DataTypes.STRING,
			allowNull: true
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		classMethods: {
			associate: function(models){
				Usuario.belongsTo(models.Empleado, {foreignKey: {allowNull: false}});
				Usuario.belongsTo(models.tipoUsuario, {foreignKey: {allowNull: false}});
				Usuario.belongsTo(models.Rol, {foreignKey: {allowNull: false}});

				Usuario.hasMany(models.Factura);
			}
		},
		freezeTableName: true,
		tableName: 'usuario'
	});

	return Usuario;
}