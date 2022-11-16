const { response } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {

  const { correo, password } = req.body;

  try {

    // Veiificr si el email existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correcctos'
      })
    }

    // Si el usuario esta activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correcctos - estado: false'
      })
    }

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correcctos - password'
      })
    }

    // Generar el JWT
    const token = await generarJWT(usuario.id);


    res.json({
      usuario,
      token
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Hable con el administrador'
    })
  }
}


const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { nombre, img, correo } = await googleVerify(id_token)

    let usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      // Tengo que crearlo
      const data = {
        nombre,
        correo,
        password: ':P',
        img,
        rol: 'USER_ROLE',
        google: true
      }
      
      usuario = new Usuario( data );
      await usuario.save();
    }

    // Si el usuario en BD
    if ( !usuario.estado ) {
      return res.status(401).json({
        msg: 'Hable con el administrador - Usuario bloqueado'
      });
    }

    // Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token
    });
  } catch (error) {
    console.log(error)
    res.status(404).json({
      ok: false,
      msg: 'El Token no se pudo verificar'
    })
  }


}

module.exports = {
  login,
  googleSignIn
}