import { Edit, Trash, Loader } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import { 
    useGetProjectsQuery, 
    useDeleteProjectMutation, 
    useCreateProjectMutation } from '../../slices/projectApiSlice.js';
import toast, { Toaster } from 'react-hot-toast';
import { Button } from '@/components/ui/button.jsx';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableRow } from '@/components/ui/table.jsx';

const ProjectListScreen = () => {
  const navigate = useNavigate();
  const { data: projects, isLoading, error, refetch } = useGetProjectsQuery();
  const [deleteProject, { isLoading: loadingDelete }] = useDeleteProjectMutation();
  const [createProject, { isLoading: loadingCreate }] = useCreateProjectMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        console.log(`Attempting to delete project with ID: ${id}`);
        await deleteProject(id).unwrap();
        toast.success('Project deleted successfully');
        refetch();
      } catch (err) {
        console.error('Error deleting project:', err);
        toast.error(err?.data?.message || err.message);
      }
    }
  };

  const createProjectHandler = async () => {
    if (window.confirm('Are you sure you want to create a new project?')) {
      try {
        await createProject().unwrap();
        toast.success('Project created successfully');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.message || 'An error occurred while creating the project');
      }
    }
  };

  const getStatusStyle = (status) => {
    const colorMap = {
      'completed': 'green',
      'not started': 'red',
      'ongoing': 'yellow'
    };
    const color = colorMap[status.toLowerCase()] || 'black';

    return {
      color,
      borderColor: color,
      borderRadius: '12px',
      borderWidth: '1px',
      borderStyle: 'solid',
      padding: '4px 8px',
      display: 'inline-block'
    };
  };

  return (
    <div>
      <Toaster />
      <h1>Projects</h1>
      <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '16px 0' }}>
        <Button onClick={createProjectHandler} variant="contained" color="blue">
          Create Project
        </Button>
      </div>

      {(loadingCreate || loadingDelete || isLoading) && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Loader size={48} color="black" className="spinner" />
        </div>
      )}

      {!loadingCreate && !loadingDelete && !isLoading && error ? (
        <div style={{ color: 'red' }}>{error.data.message}</div>
      ) : (
        projects && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Project Name</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project._id}>
                  <TableCell>{project._id}</TableCell>
                  <TableCell>{project.ProjectName}</TableCell>
                  <TableCell>{new Date(project.StartDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(project.EndDate).toLocaleDateString()}</TableCell>
                  <TableCell style={getStatusStyle(project.Status)}>
                    {project.Status}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => navigate(`/dashboard/projects/${project._id}/edit`)}
                      variant="contained"
                      color="default"
                      size="small"
                    >
                      <Edit size={16} color="blue" />
                    </Button>
                    <Button
                      onClick={() => deleteHandler(project._id)}
                      variant="contained"
                      size="small"
                      style={{ marginLeft: '8px' }}
                    >
                      <Trash size={16} color="red" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
      )}
    </div>
  );
};

export default ProjectListScreen;
