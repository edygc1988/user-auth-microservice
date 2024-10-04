const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const PersonaModel = sequelize.define('PersonaIndividual', {
    identificacion: { type: DataTypes.STRING, allowNull: false },
    tipoIdentificacion: { type: DataTypes.NUMBER, allowNull: false },
    nombre: { type: DataTypes.STRING, allowNull: false },
    direccion: { type: DataTypes.STRING, allowNull: false },
    telefono: { type: DataTypes.STRING, allowNull: false },
    correo: { type: DataTypes.STRING, allowNull: false, unique: true },    
    usuarioId: { type: DataTypes.INTEGER, allowNull: false, unique: true },    
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
    tableName: 'PersonaIndividual',
    timestamps: true, // Añade automáticamente createdAt y updatedAt
    paranoid: true,   // Añade automáticamente deletedAt para soft delete
  });


  // Relaciones
  PersonaModel.associate = (models) => {
    PersonaModel.belongsToMany(models.Empleado, {
      through: 'EmpleadoPersonaIndividual',
      foreignKey: 'personaIndividualId',
      otherKey: 'empleadoId',
      as: 'empleados'
    });
  };

  return PersonaModel;
};
