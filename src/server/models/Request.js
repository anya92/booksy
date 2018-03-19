import mongoose, { Schema } from 'mongoose';

const requestSchema = new Schema({
  requestType: {
    type: 'String',
    enum: ['borrow', 'buy'],
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
  },
  bookOwner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  message: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  accepted: {
    type: Boolean,
    default: false,
  },
});

function autopopulate(next) {
  this.populate('book');
  this.populate('bookOwner');
  this.populate('user');
  next();
}

requestSchema.pre('find', autopopulate);
requestSchema.pre('findOne', autopopulate);

mongoose.model('Request', requestSchema);
