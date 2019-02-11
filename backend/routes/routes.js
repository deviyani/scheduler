let routes = require("express").Router();
let userController = require('../controllers/userController');

routes.post('/', userController.login);

module.exports = routes;