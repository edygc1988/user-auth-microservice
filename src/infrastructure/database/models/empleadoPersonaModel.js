const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const EmpleadoPersonaIndividualModel = sequelize.define('EmpleadoPersonaIndividual', {
    empleadoId: {
      type: DataTypes.INTEGER,
      references: { model: 'Empleado', key: 'id' },
      allowNull: false,
    },
    personaIndividualId: {
      type: DataTypes.INTEGER,
      references: { model: 'PersonaIndividual', key: 'id' },
      allowNull: false,
    },
    fechaInicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fechaFin: {
      type: DataTypes.DATE,
      allowNull: true, // Null si todavía está activo
    },
    tipoContrato: { type: DataTypes.STRING, allowNull: false },
    sueldo: { type: DataTypes.DOUBLE, allowNull: false },
    rol: {
      type: DataTypes.STRING,
      allowNull: true, // Rol del empleado si es necesario
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: 'EmpleadoPersonaIndividual',
    timestamps: true,
  });

  return EmpleadoPersonaIndividualModel;
};
