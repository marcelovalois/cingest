import FactoryModel from "../models/FactoryModel.js";
import sendMail from "../api/googleMail.js";

const HomeFactory = new FactoryModel('Home');

export class ReportController {

    async report(req, res) {
        try {
            const home = await HomeFactory.getModel();
            const serviceOrders = await home.list({ responsible: "Gabriel" });
            
            const service = JSON.stringify(serviceOrders);
            console.log('customerReport', service);
            
            sendMail()
              .then((result) => console.log('Email sent...', result))
              .catch((error) => console.log(error.message));

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

            sendMail()
              .then((result) => console.log('Email sent...', result))
              .catch((error) => console.log(error.message));

            res.redirect('/');
            return;
        } catch (error) {
            console.log(error);
        }
    }
}