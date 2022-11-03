/*
    Path: api/mensajes
*/

const { Router } = require("express");
const { getMessages } = require("../constrollers/getMessages");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/:from", validarJWT, getMessages);

module.exports = router;
