const ChatUser = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/generarJWT");
const createUsuer = async (req, res) => {
  try {
    const { password, email } = req.body;

    const emailExist = await ChatUser.findOne({ email });

    if (emailExist) {
      return res.status(400).json({
        ok: false,
        msg: "El email esta en uso",
      });
    }
    // se crea usuario
    const usuario = new ChatUser(req.body);
    //Ecriptar password
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    //crear usuario
    await usuario.save();
    //crear token

    // Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      ok: true,
      token,
      usuario,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Se produjo un error",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si existe el correo
    const usuarioDB = await ChatUser.findOne({ email });
    // Validar el password
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "Email o password incorrectos",
      });
    }
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        msg: "Email o password incorrectos",
      });
    }

    // Generar el JWT
    const token = await generarJWT(usuarioDB.id);

    res.json({
      ok: true,
      usuario: usuarioDB,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

// renewToken
const refreshToken = async (req, res) => {
  const uid = req.uid;

  if (!uid) {
    res.status(500).json({
      ok: false,
      msg: "Error",
    });
  }

  try {
    // Generar un nuevo JWT
    const token = await generarJWT(uid);

    // Obtener el usuario por UID
    const usuario = await ChatUser.findById(uid);

    res.json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error",
    });
  }
};
module.exports = {
  createUsuer,
  login,
  refreshToken,
};
