const jwt = require("jsonwebtoken");

const validarJWT = (req, res, next) => {
  try {
    const token = req.header("x-token");

    if (!token) {
      return res.status(401).json({
        ok: false,
        msg: "No hay token en la petición",
      });
    }

    const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.uid = uid;

    next();
  } catch (e) {
    return res.status(401).json({
      ok: false,
      msg: "Token no es válido",
    });
  }
};

const checkJWT = (token = "") => {
  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY);

    return [true, uid];
  } catch (error) {
    return [false, null];
  }
};
module.exports = {
  validarJWT,
  checkJWT,
};
