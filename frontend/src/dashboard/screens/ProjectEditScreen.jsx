import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  useGetProjectByIdQuery, 
  useUpdateProjectMutation 
} from '../../slices/projectApiSlice.js';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Loader } from 'lucide-react';
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from '@/components/ui/select.jsx';

const ProjectEditScreen = () => {
  const { id: projectId } = useParams();
  const navigate = useNavigate();

  const { data: project, isLoading, error } = useGetProjectByIdQuery(projectId);
  const [updateProject, { isLoading: loadingUpdate }] = useUpdateProjectMutation();

  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (project) {
      setProjectName(project.ProjectName);
      setDescription(project.Description);
      setStartDate(project.StartDate);
      setEndDate(project.EndDate);
      setStatus(project.Status);
    }
  }, [project]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to update this project?')) {
      try {
        await updateProject({ id: projectId, ProjectName: projectName, Description: description, StartDate: startDate, EndDate: endDate, Status: status }).unwrap();
        toast.success('Project updated successfully');
        navigate('/dashboard/projects');
      } catch (err) {
        toast.error(err?.data?.message || err.message || 'An error occurred while updating the project');
      }
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-blue-50 via-green-50 to-yellow-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Edit Project</h1>
      {isLoading || loadingUpdate ? (
        <div className="flex justify-center items-center h-48">
          <Loader size={48} color="gray" className="spinner" />
        </div>
      ) : error ? (
        <div className="text-red-600 text-center">{error.data.message}</div>
      ) : (
        <form onSubmit={submitHandler} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
          <div className="flex flex-col">
            <label htmlFor="projectName" className="text-lg font-medium text-gray-700">Project Name</label>
            <Input
              id="projectName"
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
              className="mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="text-lg font-medium text-gray-700">Description</label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="startDate" className="text-lg font-medium text-gray-700">Start Date</label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="endDate" className="text-lg font-medium text-gray-700">End Date</label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                className="mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="status" className="text-lg font-medium text-gray-700">Status</label>
            <Select 
              id="status"
              value={status} 
              onValueChange={(value) => setStatus(value)}
              className="mt-2"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Not Started">Not Started</SelectItem>
                <SelectItem value="Ongoing">Ongoing</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" variant="contained" color="primary" className="w-full mt-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition duration-300">
            Update Project
          </Button>
        </form>
      )}
    </div>
  );
};

export default ProjectEditScreen;