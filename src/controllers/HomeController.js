import Home from "../models/HomeModel.js";

export default class HomeController {
        
    async index(req, res) {
        const serviceOrders = await Home.list();
        res.render('index', { 
            serviceOrders
        });
        return;
    }

}

