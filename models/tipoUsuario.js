
module.exports = function(sequelize, DataTypes){
	var tipoUsuario = sequelize.define('tipoUsuario', {
		descripcion: {
			type: DataTypes.STRING,
			allowNull: false
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		classMethods: {
			associate: function(models){
				tipoUsuario.hasOne(models.Usuario);
			}
		},
		freezeTableName: true,
		tableName: 'tipoUsuario'
	});

	return tipoUsuario;
}