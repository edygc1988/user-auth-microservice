const EcuadorIdValidation = require('../../shared/utils/idValidation');

class ValidationService {
  static validarCedula(cedula) {
    if (!cedula) {
      throw new Error('La cédula es requerida.');
    }

    if (!EcuadorIdValidation.validarCedula(cedula)) {
      throw new Error('Cédula inválida.');
    }
  }

  static validarRUC(ruc) {
    if (!ruc) {
      throw new Error('El RUC es requerido.');
    }

    if (!EcuadorIdValidation.validarRUC(ruc)) {
      throw new Error('RUC inválido.');
    }
  }

  static validarCamposUsuario(userData) {
    const { identificacion, tipoIdentificacion } = userData;
    console.log(identificacion, tipoIdentificacion)
    if (tipoIdentificacion == 2 ) {//Cedula
      this.validarCedula(identificacion);
    }

    if (tipoIdentificacion == 1) {//Ruc
      this.validarRUC(identificacion);
    }
  }
}

module.exports = ValidationService;
