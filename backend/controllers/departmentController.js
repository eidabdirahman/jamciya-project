import Department from '../models/DepartmentModal.js';
import asyncHandler from '../middlewares/asyncHandler.js';

// Get all departments
const getDepartments = asyncHandler(async (req, res) => {
  const departments = await Department.find();
  res.status(200).json(departments);
});

// Create a new department
const createDepartment = asyncHandler(async (req, res) => {
  const { DepartmentName, DepartmentHead, Description } = req.body;
  const Image = req.file ? req.file.path : '';

  const department = new Department({
    DepartmentName : 'software Engineering',
    DepartmentHead : 'Eid Abdirahman',
    Description : 'this is the deparment description ',
    Image : 'mohamed.jpeg',
    CreatedAt: new Date(),
  });
  
  const createdDepartment = await department.save();
  res.status(201).json(createdDepartment);
});

// Get a single department by ID
const getDepartmentById = asyncHandler(async (req, res) => {
  const department = await Department.findById(req.params.id);
  if (!department) return res.status(404).json({ message: 'Department not found' });
  res.status(200).json(department);
});

// Update a department
const updateDepartment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { DepartmentName, DepartmentHead, Description } = req.body;
  const Image = req.file ? req.file.path : '';

  const updatedDepartment = await Department.findByIdAndUpdate(id, { 
    DepartmentName, 
    DepartmentHead, 
    Description, 
    Image 
  }, { new: true });

  if (!updatedDepartment) return res.status(404).json({ message: 'Department not found' });
  res.status(200).json(updatedDepartment);
});

// Delete a department
const deleteDepartment = asyncHandler(async (req, res) => {
  const deletedDepartment = await Department.findByIdAndDelete(req.params.id);
  if (!deletedDepartment) return res.status(404).json({ message: 'Department not found' });
  res.status(200).json({ message: 'Department deleted successfully' });
});

export {
  getDepartments,
  createDepartment,
  getDepartmentById,
  updateDepartment,
  deleteDepartment
};
