const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const PersonaIndividualModel = sequelize.define('PersonaIndividual', {
    identificacion: { type: DataTypes.STRING, allowNull: false },
    tipoIdentificacion: { type: DataTypes.INTEGER, allowNull: false },
    nombre: { type: DataTypes.STRING, allowNull: false },
    direccion: { type: DataTypes.STRING, allowNull: false },
    telefono: { type: DataTypes.STRING, allowNull: false },
    correo: { type: DataTypes.STRING, allowNull: false, unique: true },
    usuarioId: { type: DataTypes.INTEGER, allowNull: false },
    tipo: { type: DataTypes.INTEGER, allowNull: false},
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
  PersonaIndividualModel.associate = (models) => {
    PersonaIndividualModel.belongsToMany(models.Empleado, {
      through: 'EmpleadoPersonaIndividual',
      foreignKey: 'personaIndividualId',
      otherKey: 'empleadoId',
      as: 'empleados'
    });
  };

  return PersonaIndividualModel;
};
