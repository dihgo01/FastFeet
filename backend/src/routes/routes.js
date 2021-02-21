const express = require('express');
const cors = require('cors')
const UserController = require('../controllers/UserController')

const routes = express.Router();

routes.use(cors());

routes.get('/user', UserController.index);
routes.post('/user', UserController.store);
routes.put('/user/:id', UserController.update);
routes.delete('/user/:id', UserController.delete);

module.exports = routes;