/*
    path: api/login
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarJWT } = require("../middlewares/validar-jwt");
const { createUsuer, login, refreshToken } = require("../constrollers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const router = Router();
//Create User
router.post(
  "/new",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    check("name", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  createUsuer
);
//Login
router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  login
);

//refresh token

router.get("/refresh", validarJWT, refreshToken);

module.exports = router;
