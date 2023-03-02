import mongoose, { Schema } from 'mongoose';
import OSInterface from '../interface/OSInterface';

const HomeSchema = new Schema({
  title: { type: String, required: true },
  start: { type: Date, default: Date.now },
  end: { type: Date, default: new Date(1679802110000)},
  customer: String,
  responsible: String
});

const HomeModel = mongoose.model('Home', HomeSchema);

class Home implements OSInterface {

  private body: any;
  private errors: any;
  private os: any;

  constructor(body) {
    this.body = body;
    this.errors = [];
    this.os = null;
  }

  async list(filter=null) {
    return await HomeModel.find(filter);
  }

  async insert() {
    if (this.errors.length > 0) return;
    this.os = await HomeModel.create(this.body);
  }

  async singleView(id) {
    if (typeof id !== 'string') return;
    const os = HomeModel.findById(id);
    return os;
  }

  async edit(id) {
    if (typeof id !== 'string') return;
    if (this.errors.length > 0 ) return;
    this.os = await HomeModel.findByIdAndUpdate(id, this.body, { new: true });
  }

  async delete(id) {
    if (typeof id !== 'string') return;
    const os = await HomeModel.findOneAndDelete({ '_id': id });
    return os;
  }
}

export default Home;
