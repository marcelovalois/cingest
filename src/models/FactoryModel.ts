import Home from "./HomeModel";
import User from "./UserModel";


class FactoryModel {

    private type: any;

    constructor(type) {
        this.type = type;
    }

    async getModel(attributes=null) {
        switch (this.type) {
            case 'Home':
                return new Home(attributes);
                break;
            case 'User':
                return new User(attributes);
                break;
            default:
                break;
        }
    }
}
  
  export default FactoryModel;