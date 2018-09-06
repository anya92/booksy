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
  category: {
    type: String,
    default: 'Other',
  },
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
});

bookSchema.statics.getCategoriesList = function() {
  return this.aggregate([
    { $unwind: '$category' },
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
}

function autopopulate(next) {
  this.populate('owner');
  next();
}

bookSchema.pre('find', autopopulate);
bookSchema.pre('findOne', autopopulate);

mongoose.model('Book', bookSchema);
