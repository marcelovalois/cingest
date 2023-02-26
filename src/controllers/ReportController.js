import FactoryModel from "../models/FactoryModel.js";

const HomeFactory = new FactoryModel('Home');

export class ReportController {

    async report(req, res) {
        try {
            const home = await HomeFactory.getModel();
            const serviceOrders = await home.list({ responsible: "Gabriel" });
            
            const service = JSON.stringify(serviceOrders);
            console.log('customerReport', service);
            
            res.redirect('/');
            return;
        } catch (error) {
            console.log(error);
        }
    }
}

export class SupervisorController {
    constructor(reportController) {
        this.reportController = reportController;
    }
    
    async report(req, res) {
        try {
            const home = await HomeFactory.getModel();
            const serviceOrders = await home.list();
            
            const service = JSON.stringify(serviceOrders);
            console.log('supervisorReport', service);

            res.redirect('/');
            return;
        } catch (error) {
            console.log(error);
        }
    }
}