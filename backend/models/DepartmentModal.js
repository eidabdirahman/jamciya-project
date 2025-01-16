import mongoose from "mongoose";

const departmentSchema = mongoose.Schema({
    DepartmentName: {
        type: String,
        required: true
    },
    DepartmentHead: {
        type: String
    },
    Description: {
        type: String,
        required: true
    },
    Image: {
        type: String, 
        required: false
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Department = mongoose.model("Department", departmentSchema);

export default Department;
