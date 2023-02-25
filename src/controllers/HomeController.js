import Home from "../models/HomeModel.js";

export default class HomeController {
        
    async index(req, res) {
        const serviceOrders = await Home.list();
        res.render('index', { 
            serviceOrders
        });
        return;
    }

    async insertIndex(req, res) {
        res.render('osRegister', { os: {} });
        return;
    }

    async insert(req, res) {
        try {
            const home = new Home(req.body);
            await home.insert();
            res.redirect('/');
            return;
            
        } catch (error) {
            console.log(error);
            res.render(404);
        }
    }

    async editIndex(req, res) {
        if (!req.params.id) return res.render('404');

        const os = await Home.singleView(req.params.id);

        if (!os) return res.render('404');
        res.render('osRegister', { os })
        return;
    }

    async edit(req, res) {
        try {
            if (!req.params.id) return res.render('404');
            const os = new Home(req.body);
            await os.edit(req.params.id);
            res.redirect('/');
        } catch (error) {
            console.log(error);
            res.render(404);
        }
    }

    

}

