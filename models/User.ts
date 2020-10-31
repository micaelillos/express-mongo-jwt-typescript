import mongoose, { Schema } from 'mongoose';

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
}
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 6,
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
