var express = require("express");
var router = express.Router();
var usersController = require("../controllers/users-controller");

router.post("/login", async function(req, res, next) {
 await usersController.login(req, res,next);
});

router.post("/signup",async function(req, res) {
    await usersController.signup(req, res);
});

router.get("/",async function(req, res) {
    await usersController.getAllUsers(req, res);
});

router.put("/:id",async function(req, res) {
    await usersController.editUserById(req, res);
});

router.delete("/:id",async function(req, res) {
    await usersController.deleteUser(req, res);
});

router.put("/:id/changePassword",async function(req, res) {
    await usersController.changePassword(req, res);
});
module.exports = router;