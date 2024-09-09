    const { Sequelize } = require('sequelize');
    const config = require('../../config/config')[process.env.NODE_ENV || 'development'];

    const sequelize = new Sequelize(config);

    const UsuarioModel = require('./UsuarioModel')(sequelize);
    const RolModel = require('./RolModel')(sequelize);
    const UsuarioRolModel = require('./UsuarioRolModel')(sequelize);
    const EmpresaModel = require('./EmpresaModel')(sequelize);
    const PersonaModel = require('./PersonaIndividualModel')(sequelize);
    const EmpleadoModel = require('./EmpleadoModel')(sequelize);

    UsuarioModel.belongsToMany(RolModel, { through: UsuarioRolModel });
    RolModel.belongsToMany(UsuarioModel, { through: UsuarioRolModel });

    UsuarioModel.hasOne(PersonaModel, { foreignKey: 'usuarioId' });
    UsuarioModel.hasOne(EmpleadoModel, { foreignKey: 'usuarioId' });


    sequelize.sync();

    module.exports = { sequelize, UsuarioModel, RolModel, UsuarioRolModel, EmpresaModel, PersonaModel, EmpleadoModel };
