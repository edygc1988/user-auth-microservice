const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const EmpleadoModel = sequelize.define('Empleado', {
    identificacion: { type: DataTypes.STRING, allowNull: false },
    tipoIdentificacion: { type: DataTypes.INTEGER, allowNull: false },
    nombre: { type: DataTypes.STRING, allowNull: false },
    direccion: { type: DataTypes.STRING, allowNull: false },
    telefono: { type: DataTypes.STRING, allowNull: false },
    correo: { type: DataTypes.STRING, allowNull: false, unique: true },
    usuarioId: { type: DataTypes.STRING, allowNull: false },
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
    tableName: 'Empleado',
    timestamps: true, // Añade automáticamente createdAt y updatedAt
    paranoid: true,   // Añade automáticamente deletedAt para soft delete
  });

  // Relaciones
  EmpleadoModel.associate = (models) => {
    EmpleadoModel.belongsToMany(models.PersonaIndividual, {
      through: 'EmpleadoPersonaIndividual',
      foreignKey: 'empleadoId',
      otherKey: 'personaIndividualId',
      as: 'personas' // Alias coincide con el usado en la consulta
    });
    
    EmpleadoModel.belongsToMany(models.Empresa, {
      through: 'EmpleadoEmpresa',
      foreignKey: 'empleadoId',
      otherKey: 'empresaId',
      as: 'empresas' // Alias coincide con el usado en la consulta
    });
    
  };



  return EmpleadoModel;
};
