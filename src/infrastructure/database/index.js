const { Sequelize } = require('sequelize');
const config = require('../../config/config')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(config);

const UsuarioModel = require('./models/usuarioModel')(sequelize);
const RolModel = require('./models/rolModel')(sequelize);
const UsuarioRolModel = require('./models/usuarioRolModel')(sequelize);
const EmpresaModel = require('./models/empresaModel')(sequelize);
const PersonaIndividualModel = require('./models/personaIndividualModel')(sequelize);
const EmpleadoModel = require('./models/empleadoModel')(sequelize);
const EmpleadoPersonaModel = require('./models/empleadoPersonaModel')(sequelize);
const EmpleadoEmpresaModel = require('./models/empleadoEmpresaModel')(sequelize);

// Relaciones de Usuario con Roles
UsuarioModel.belongsToMany(RolModel, { through: UsuarioRolModel });
RolModel.belongsToMany(UsuarioModel, { through: UsuarioRolModel });

// Relaciones de Usuario con Persona y Empleado
UsuarioModel.hasOne(EmpresaModel, { foreignKey: 'usuarioId', as: 'empresa' }); // Ajusta el alias a 'empresa'
UsuarioModel.hasOne(PersonaIndividualModel, { foreignKey: 'usuarioId', as: 'personaIndividual' }); // Ajusta el alias a 'personaIndividual'



// Relaciones de Empleado con Empresa y PersonaIndividual (Estas son las relaciones que faltaban)
EmpleadoModel.belongsToMany(EmpresaModel, { 
  through: EmpleadoEmpresaModel, 
  foreignKey: 'empleadoId', 
  otherKey: 'empresaId',
  as: 'empresas' // Alias para la relación
});

EmpleadoModel.belongsToMany(PersonaIndividualModel, { 
  through: EmpleadoPersonaModel, 
  foreignKey: 'empleadoId', 
  otherKey: 'personaIndividualId',
  as: 'personas' // Alias para la relación
});

// Relaciones de Empresa y Persona con Empleados
EmpresaModel.belongsToMany(EmpleadoModel, { 
  through: EmpleadoEmpresaModel, 
  foreignKey: 'empresaId',
  otherKey: 'empleadoId',
  as: 'empleados' 
});

PersonaIndividualModel.belongsToMany(EmpleadoModel, { 
  through: EmpleadoPersonaModel, 
  foreignKey: 'personaIndividualId',
  otherKey: 'empleadoId',
  as: 'empleados' 
});

// Sincronización de modelos con la base de datos
sequelize.sync();

module.exports = { 
  sequelize, 
  UsuarioModel, 
  RolModel, 
  UsuarioRolModel, 
  EmpresaModel, 
  PersonaIndividualModel, 
  EmpleadoModel, 
  EmpleadoPersonaModel, 
  EmpleadoEmpresaModel 
};
