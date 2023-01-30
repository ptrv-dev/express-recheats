import mongoose from 'mongoose';

const PostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      default: 'empty',
    },
    description: {
      type: String,
      default: 'empty',
    },
    image: {
      type: String,
      default: '',
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
