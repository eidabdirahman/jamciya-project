import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    ProjectName: {
        type: String,
        required: true
    },
    Description: {
        type: String
    },
    image: {
        type: String,
        required: true,
      },
    StartDate: {
        type: Date
    },
    EndDate: {
        type: Date
    },
    Status: { 
        type: String, 
        enum: ['ongoing', 'completed', 'on-hold'], 
        default: 'ongoing' 

    },
    CreatedAt: {
        type: Date,
        default: Date.now
    },
    ManagerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
