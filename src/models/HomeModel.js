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
    this.errors = [];
    this.os = null;
  }

  static async list() {
    return await HomeModel.find();
  }

  async insert() {
    if (this.errors.length > 0) return;
    this.os = await HomeModel.create(this.body);
  }

  static async singleView(id) {
    if (typeof id !== 'string') return;
    const os = HomeModel.findById(id);
    return os;
  }

  async edit(id) {
    if (typeof id !== 'string') return;
    if (this.errors.length > 0 ) return;
    this.os = await HomeModel.findByIdAndUpdate(id, this.body, { new: true });
  }
}

export default Home;
