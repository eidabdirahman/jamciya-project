import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  useGetProjectByIdQuery, 
  useUpdateProjectMutation } from '../../slices/projectApiSlice.js';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Loader } from 'lucide-react';
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from '@/components/ui/select.jsx'; // Importing Select components

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
    <div>
      <h1>Edit Project</h1>
      {isLoading || loadingUpdate ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Loader size={48} color="gray" className="spinner" />
        </div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error.data.message}</div>
      ) : (
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="projectName">Project Name</label>
            <Input
              id="projectName"
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="startDate">Start Date</label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="endDate">End Date</label>
            <Input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="status">Status</label>
            <Select 
              id="status"
              value={status} 
              onValueChange={(value) => setStatus(value)}
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
          <Button type="submit" variant="contained" color="primary">
            Update Project
          </Button>
        </form>
      )}
    </div>
  );
};

export default ProjectEditScreen;
        