import Project from '../models/ProjectModal.js';
import asyncHandler from '../middlewares/asyncHandler.js';

// Get all projects
const getProjects = asyncHandler(async (req, res) => {
    const projects = await Project.find();
    res.status(200).json(projects);
});

// Create a new project
const createProject = asyncHandler(async (req, res) => {
    const { ProjectName, Description, StartDate, EndDate, ManagerID } = req.body;
  
    const project = new Project({
      ProjectName: 'Sample Project Name',
      Description: 'Sample Description',
      StartDate: new Date(),
      EndDate: new Date(),
      status: 'ongoing',
      image: '/images/sample-project.jpg',
    });
  
    const createdProject = await project.save();
    res.status(201).json(createdProject);
  });
  

// Get a single project by ID
const getProjectById = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json(project);
});

// Update a project
const updateProject = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { ProjectName, Description, StartDate, EndDate, ManagerID } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(id, { ProjectName, Description, StartDate, EndDate, ManagerID }, { new: true });
    if (!updatedProject) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json(updatedProject);
});

// Delete a project
const deleteProject = asyncHandler(async (req, res) => {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json({ message: 'Project deleted successfully' });
});

export {
    getProjects,
    createProject,
    getProjectById,
    updateProject,
    deleteProject
};
