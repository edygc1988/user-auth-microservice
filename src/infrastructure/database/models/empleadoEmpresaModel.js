const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const EmpleadoEmpresaModel = sequelize.define('EmpleadoEmpresa', {
    empleadoId: {
      type: DataTypes.INTEGER,
      references: { model: 'Empleado', key: 'id' },
      allowNull: false,
    },
    empresaId: {
      type: DataTypes.INTEGER,
      references: { model: 'Empresa', key: 'id' },
      allowNull: false,
    },
    fechaInicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fechaFin: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    tipoContrato: { type: DataTypes.STRING, allowNull: false },
    sueldo: { type: DataTypes.DOUBLE, allowNull: false },
    rol: {
      type: DataTypes.STRING,
      allowNull: true,
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
    tableName: 'EmpleadoEmpresa',
    timestamps: true,
  });

  return EmpleadoEmpresaModel;
};
