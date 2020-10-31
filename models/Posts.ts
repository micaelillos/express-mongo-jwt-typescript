import mongoose, { Schema } from 'mongoose';

const PostSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Posts', PostSchema);
