import express from 'express';

import HomeController from './src/controllers/HomeController';
import { ReportController, SupervisorController } from './src/controllers/ReportController'

const routes = express.Router();
const homeController = new HomeController();

const reportController = new ReportController();
const supervisorController = new SupervisorController(reportController);

// Rotas da home
routes.get('/', homeController.index);

// Rotas de OS
routes.get('/register', homeController.insertIndex);
routes.post('/register', homeController.insert);

routes.get('/register/:id', homeController.editIndex);
routes.post('/register/:id', homeController.edit);

routes.get('/register/delete/:id', homeController.delete);

routes.get('/report', reportController.report);
routes.get('/report/supervisor', supervisorController.report);

export default routes;