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
  receiver: { // book owner
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  sender: { // request author
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
  this.populate('book receiver sender');
  next();
}

requestSchema.pre('find', autopopulate);
requestSchema.pre('findOne', autopopulate);

mongoose.model('Request', requestSchema);
