import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  googleId: String,
  name: String,
  email: String,
  bookmarks: [
    { type: Schema.Types.ObjectId, ref: 'Book' }
  ],
  firstName: String,
  lastName: String,
  city: String,
  country: String,
});

mongoose.model('User', userSchema);
