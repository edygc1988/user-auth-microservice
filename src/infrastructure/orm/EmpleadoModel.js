const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const EmpleadoModel = sequelize.define('Empleado', {
    identificacion: { type: DataTypes.STRING, allowNull: false },
    tipoIdentificacion: { type: DataTypes.STRING, allowNull: false },
    nombre: { type: DataTypes.STRING, allowNull: false },
    direccion: { type: DataTypes.STRING, allowNull: false },
    telefono: { type: DataTypes.STRING, allowNull: false },
    correo: { type: DataTypes.STRING, allowNull: false, unique: true },
    tipoContrato: { type: DataTypes.STRING, allowNull: false },
    fechaIngreso: { type: DataTypes.DATE, allowNull: false },
    sueldo: { type: DataTypes.DOUBLE, allowNull: false },
    usuarioId: { type: DataTypes.INTEGER, allowNull: false },
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

  return EmpleadoModel;
};
