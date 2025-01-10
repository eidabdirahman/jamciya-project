import mongoose from "mongoose";

const departmentSchema = mongoose.Schema({
    DepartmentName: {
        type: String,
        required: true
    },
    DepartmentHead: {
        type: String
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
