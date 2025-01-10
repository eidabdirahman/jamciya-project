import mongoose from 'mongoose';

const partnerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    website: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Partner = mongoose.model('Partner', partnerSchema);

export default Partner;
