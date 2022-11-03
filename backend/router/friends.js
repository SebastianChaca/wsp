/*
    Path: api/friends
*/

const { Router } = require("express");
const { addFriend, getFriends } = require("../constrollers/friends");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.post("/addfriend", validarJWT, addFriend);
router.get("/getfriends", validarJWT, getFriends);
module.exports = router;
