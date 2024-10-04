const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  const UsuarioModel = sequelize.define('Usuario', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    correo: { type: DataTypes.STRING, allowNull: false, unique: true },
    contraseña: { type: DataTypes.STRING, allowNull: false },
    refreshToken: {type: DataTypes.STRING },
    // Campos de auditoría
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    updatedBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: 'Usuario',
    timestamps: true, // Añade automáticamente createdAt y updatedAt
    paranoid: true,   // Añade automáticamente deletedAt para soft delete
  });

  UsuarioModel.beforeCreate(async (usuario) => {
    usuario.contraseña = await bcrypt.hash(usuario.contraseña, 10);
  });

  UsuarioModel.associate = (models) => {
    UsuarioModel.belongsToMany(models.Rol, {
      through: 'UsuarioRol',
      as: 'Rols',
      foreignKey: 'usuarioId'
    });
  };

  return UsuarioModel;
};
