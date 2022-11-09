const { response } = require("express");


const esAdminRole = (req, res = response,next) => {
    if ( !req.usuario ) {
        return res.status(500).json({
            msg: "Se quiere verificar el rol sin validar el token primaro"
        })
    }

    const { rol, nombre } = req.usuario;

    if ( rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `El usuario ${nombre} no es administrador`
        });
    }

    next();

}

const tieneRol = ( ...roles ) => {
    return (req, res = response,next) => {

        if ( !req.usuario ) {
            return res.status(500).json({
                msg: "Se quiere verificar el rol sin validar el token primaro"
            })
        }

        if ( !roles.includes(req.usuario.rol) ) {
            return res.status(401).json({
                msg: `El serivicio requiere uno de estos roles ${ roles }`
            });
        }
        console.log(roles, req.usuario.rol)
        next()
    }
}

module.exports = {
    esAdminRole,
    tieneRol
}