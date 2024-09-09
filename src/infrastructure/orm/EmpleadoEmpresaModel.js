const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const EmpleadoEmpresaModel = sequelize.define(
    "EmpleadoEmpresa",
    {
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
    },
    {
      tableName: "EmpleadoEmpresa",
      timestamps: true, // Añade automáticamente createdAt y updatedAt
      paranoid: true, // Añade automáticamente deletedAt para soft delete
    }
  );
  return EmpleadoEmpresaModel;
};
