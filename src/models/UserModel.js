import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true }
});

const UserModel = mongoose.model('User', UserSchema);

class User {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.os = null;
  }

  async list() {
    return await UserModel.find();
  }

  async insert() {
    if (this.errors.length > 0) return;
    this.os = await UserModel.create(this.body);
  }

  async singleView(id) {
    if (typeof id !== 'string') return;
    const os = UserModel.findById(id);
    return os;
  }

  async edit(id) {
    if (typeof id !== 'string') return;
    if (this.errors.length > 0 ) return;
    this.os = await UserModel.findByIdAndUpdate(id, this.body, { new: true });
  }

  async delete(id) {
    if (typeof id !== 'string') return;
    const os = await UserModel.findOneAndDelete(id);
    return os;
  }
}

export default User;
