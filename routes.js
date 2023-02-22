import express from 'express';

import HomeController from './src/controllers/HomeController.js';

const routes = express.Router();
const homeController = new HomeController();

// Rotas da home
routes.get('/', homeController.index);

export default routes;