import FactoryModel from "../models/FactoryModel";

const UserFactory = new FactoryModel('User');

export default class UserController {
        
    async index(req, res) {
        const home = await UserFactory.getModel();
        const serviceOrders = await home.list();
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
            const home = await UserFactory.getModel(req.body);
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

        const home = await UserFactory.getModel();
        const os = await home.singleView(req.params.id);

        if (!os) return res.render('404');
        res.render('osRegister', { os })
        return;
    }

    async edit(req, res) {
        try {
            if (!req.params.id) return res.render('404');
            const os = await UserFactory.getModel(req.body);
            await os.edit(req.params.id);
            res.redirect('/');
        } catch (error) {
            console.log(error);
            res.render(404);
        }
    }

    async delete(req, res) {
        if (!req.params.id) return res.render('404');

        const home = await UserFactory.getModel();
        const os = await home.delete(req.params.id);
        if (!os) return res.render('404');
        res.redirect('/');

        return;
    }

}

