const express = require('express');
const cors = require('cors')
const multer = require('multer')
const multerConfig = require('../config/multer')
const auth = require ('../middleware/auth')
const UserController = require('../controllers/UserController')
const SessionController = require('../controllers/SessionController')
const RecipientsController = require('../controllers/RecipientsController')
const DeliverymanController = require('../controllers/DeliverymanController')
const FilesController = require('../controllers/FilesController')
const OrderController = require('../controllers/OrderController')
const TasksController = require('../controllers/TasksController')


const routes = express.Router();
const upload = multer(multerConfig);
routes.use(cors());
/**
 * The User and Session
 */
routes.post('/user', UserController.store);
routes.post('/session', SessionController.store);
routes.get('/deliveryman/:id', TasksController.index);

routes.use(auth)
routes.get('/user', UserController.index);
routes.put('/user', UserController.update);
routes.delete('/user', UserController.delete);
/**
 * The Recipients
 */
routes.get('/recipients', RecipientsController.index);
routes.post('/recipients', RecipientsController.store);
routes.put('/recipients/:id', RecipientsController.update);
/**
 * The Deliveryman
 */
routes.post('/deliverymans', DeliverymanController.store);
routes.get('/deliverymans', DeliverymanController.index);
routes.put('/deliverymans/:id', DeliverymanController.update);
routes.delete('/deliverymans/:id', DeliverymanController.delete);
/**
 * The Orders
 */
routes.post('/orders', OrderController.store);
routes.get('/orders', OrderController.index);
routes.put('/orders/:id', OrderController.update);
routes.delete('/orders/:id', OrderController.delete);
routes.put('/orders/:id/retreat', OrderController.start);
/**
 * The Files
 */
routes.post('/files', upload.single('file'),FilesController.store);

module.exports = routes;