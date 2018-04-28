import mongoose, { Schema } from 'mongoose';

const bookSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: 'You must supply a title',
  },
  author: {
    type: String,
    trim: true,
    required: 'You must supply an author',
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  image: String,
  description: {
    type: String,
    trim: true,
  },
  added: {
    type: Date,
    default: Date.now,
  },
  category: String,
  toBorrow: {
    type: Boolean,
    default: true,
  },
  toSell: {
    type: Boolean,
    default: false,
  },
  state: {
    type: String,
    enum: ['available', 'borrowed', 'sold'],
    default: 'available',
  }
});

bookSchema.index({
  title: 'text',
  author: 'text',
  description: 'text',
});

function autopopulate(next) {
  this.populate('owner');
  next();
}

bookSchema.pre('find', autopopulate);
bookSchema.pre('findOne', autopopulate);

mongoose.model('Book', bookSchema);
