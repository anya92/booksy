import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  googleId: String,
  name: String,
  email: String,
  bookmarks: [
    { type: Schema.Types.ObjectId, ref: 'Book' }
  ]
});

mongoose.model('User', userSchema);
