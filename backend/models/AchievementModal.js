import mongoose from "mongoose";

const achievementSchema = mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
      },
    
}, {
    timestamps: true
});

const Achievement = mongoose.model("Achievement", achievementSchema);

export default Achievement;
