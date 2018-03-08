import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  googleId: String,
  name: String,
  email: String,
});

mongoose.model('User', userSchema);
