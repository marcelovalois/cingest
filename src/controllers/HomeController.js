import Home from "../models/HomeModel.js";

export default class HomeController {
        
    async index(req, res) {
        const serviceOrders = await Home.list();
        res.render('index', { 
            serviceOrders
        });
        return;
    }

    async register(req, res) {
        res.render('osRegister', {});
        return;
    }

    async insert(req, res) {
        try {
            const home = new Home(req.body);
            home.insert();
            res.redirect('/');
            return;
            
        } catch (error) {
            console.log(error);
            res.render(404);
        }
    }

}

