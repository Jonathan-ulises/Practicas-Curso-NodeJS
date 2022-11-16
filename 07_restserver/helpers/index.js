const dbValidators = require('./db-validators');
const generarJWT = require('./generarJWT');
const googleVeridy = require('./google-verify');
const subirArchivo = require('./subr-archivo');

module.exports = {
    ...dbValidatorssubirArchivo,
    ...generarJWTsubirArchivo,
    ...googleVeridysubirArchivo,
    ...subirArchivo,
}