class IdValidation {
  static validarCedula(cedula) {
    // Verificar que la cédula tenga exactamente 10 dígitos
    if (!/^\d{10}$/.test(cedula)) {
      return false;
    }

    // Obtener el código de provincia (los dos primeros dígitos de la cédula)
    const provincia = parseInt(cedula.substring(0, 2), 10);

    // El tercer dígito debe ser menor que 6 (0-5) para cédulas de personas naturales
    const tercerDigito = parseInt(cedula.charAt(2), 10);
    if (tercerDigito >= 6) {
      return false;
    }

    // Verificar que el código de provincia sea válido (entre 1 y 24)
    if (provincia < 1 || provincia > 24) {
      return false;
    }

    // Aplicar el algoritmo de validación de cédula
    const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    let suma = 0;

    // Sumar los productos según el coeficiente para cada dígito
    for (let i = 0; i < 9; i++) {
      let valor = parseInt(cedula.charAt(i), 10) * coeficientes[i];
      if (valor >= 10) {
        valor -= 9;
      }
      suma += valor;
    }

    // Obtener el último dígito de la cédula (dígito verificador)
    const digitoVerificador = parseInt(cedula.charAt(9), 10);

    // Calcular el dígito correcto para validar la cédula
    const residuo = suma % 10;
    const digitoCorrecto = residuo === 0 ? 0 : 10 - residuo;

    // Retornar si el dígito verificador es igual al dígito correcto
    return digitoVerificador === digitoCorrecto;
  }

  static validarRUC(ruc) {
    // Validación de RUC para personas naturales (13 dígitos, los primeros 10 son la cédula)
    if (ruc.length === 13 && ruc.substring(10, 13) === "001") {
      return this.validarCedula(ruc.substring(0, 10));
    }

    // Validación de RUC para sociedades privadas (tercer dígito = 9)
    if (ruc.length === 13 && ruc.charAt(2) === "9") {
      return this.validarRucSociedadPrivada(ruc);
    }

    // Validación de RUC para instituciones públicas (tercer dígito = 6)
    if (ruc.length === 13 && ruc.charAt(2) === "6") {
      return this.validarRucInstitucionPublica(ruc);
    }

    return false;
  }

  static validarRucSociedadPrivada(ruc) {
    const coeficientes = [4, 3, 2, 7, 6, 5, 4, 3, 2];
    let suma = 0;

    // Multiplicar los primeros nueve dígitos por los coeficientes y sumar los productos
    for (let i = 0; i < 9; i++) {
      suma += parseInt(ruc.charAt(i), 10) * coeficientes[i];
    }

    // Obtener el último dígito de la suma y calcular el dígito verificador
    const residuo = suma % 11;
    const digitoCorrecto = residuo === 0 ? 0 : 11 - residuo;

    // El décimo dígito del RUC debe coincidir con el dígito verificador
    const digitoVerificador = parseInt(ruc.charAt(9), 10);

    return digitoVerificador === digitoCorrecto;
  }

  static validarRucInstitucionPublica(ruc) {
    const coeficientes = [3, 2, 7, 6, 5, 4, 3, 2];
    let suma = 0;

    // Multiplicar los primeros ocho dígitos por los coeficientes y sumar los productos
    for (let i = 0; i < 8; i++) {
      suma += parseInt(ruc.charAt(i), 10) * coeficientes[i];
    }

    // Obtener el último dígito de la suma y calcular el dígito verificador
    const residuo = suma % 11;
    const digitoCorrecto = residuo === 0 ? 0 : 11 - residuo;

    // El noveno dígito del RUC debe coincidir con el dígito verificador
    const digitoVerificador = parseInt(ruc.charAt(8), 10);

    return digitoVerificador === digitoCorrecto;
  }
}

module.exports = IdValidation;
