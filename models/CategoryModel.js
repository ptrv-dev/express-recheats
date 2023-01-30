import mongoose from 'mongoose';

const CategorySchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
  },
  { timestamps: true }
);

const CategoryModel = mongoose.model('Category', CategorySchema);

export default CategoryModel;
