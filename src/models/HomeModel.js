import mongoose, { Schema } from 'mongoose';

const HomeSchema = new Schema({
  title: { type: String, required: true },
  start: { type: Date, default: Date.now },
  customer: String,
  responsible: String
});

const HomeModel = mongoose.model('Home', HomeSchema);

class Home {
  constructor(body) {
    this.body = body;
  }

  static async list() {
    const result = await HomeModel.find();
    return result;
  }
}

export default Home;
