import FactoryModel from "../models/FactoryModel";
import sendMail from "../api/googleMail";

const HomeFactory = new FactoryModel('Home');

export class ReportController {

    async report(req, res) {
        try {
            const home = await HomeFactory.getModel();
            const serviceOrders = await home.list({ responsible: "Gabriel" });
            
            const service = JSON.stringify(serviceOrders);
            console.log('customerReport', service);
            
            sendMail(service)
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

    private reportController: any;

    constructor(reportController) {
        this.reportController = reportController;
    }
    
    async report(req, res) {
        try {
            const home = await HomeFactory.getModel();
            const serviceOrders = await home.list();
            
            const service = JSON.stringify(serviceOrders);
            console.log('supervisorReport', service);

            sendMail(service)
              .then((result) => console.log('Email sent...', result))
              .catch((error) => console.log(error.message));

            res.redirect('/');
            return;
        } catch (error) {
            console.log(error);
        }
    }
}