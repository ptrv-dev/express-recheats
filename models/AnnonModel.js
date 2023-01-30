import mongoose from 'mongoose';

const AnnonSchema = mongoose.Schema({
  text: {
    type: String,
  },
});

const AnnonModel = mongoose.model('Announcement', AnnonSchema);

export default AnnonModel;
