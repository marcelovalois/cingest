import express from 'express';

import HomeController from './src/controllers/HomeController.js';

const routes = express.Router();
const homeController = new HomeController();

// Rotas da home
routes.get('/', homeController.index);

// Rotas de OS
routes.get('/register', homeController.insertIndex);
routes.post('/register', homeController.insert);
routes.get('/register/:id', homeController.editIndex);
routes.post('/register/:id', homeController.edit);

export default routes;