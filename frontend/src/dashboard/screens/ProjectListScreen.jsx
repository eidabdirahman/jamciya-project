import { Edit, Trash, Loader } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import { 
  useGetProjectsQuery, 
  useDeleteProjectMutation, 
  useCreateProjectMutation 
} from '../../slices/projectApiSlice.js';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button.jsx';

const ProjectListScreen = () => {
  const navigate = useNavigate();
  const { data: projects, isLoading, error, refetch } = useGetProjectsQuery();
  const [deleteProject, { isLoading: loadingDelete }] = useDeleteProjectMutation();
  const [createProject, { isLoading: loadingCreate }] = useCreateProjectMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id).unwrap();
        toast.success('Project deleted successfully');
        refetch();
      } catch (err) {
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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <div className="flex justify-end gap-4 mb-4">
        <Button onClick={createProjectHandler} className="bg-green-500 text-white">
          Create Project
        </Button>
      </div>

      {(loadingCreate || loadingDelete || isLoading) && (
        <div className="text-center py-4">
          <Loader size={48} className="animate-spin mx-auto text-gray-700" />
        </div>
      )}

      {!loadingCreate && !loadingDelete && !isLoading && error ? (
        <div className="text-red-500">{error.data.message}</div>
      ) : (
        projects && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gray-800 text-white">
                  {['ID', 'Project Name', 'Start Date', 'End Date', 'Status', 'Actions'].map((title) => (
                    <th key={title} className="text-left px-4 py-2">{title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <tr key={project._id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-4 py-2">{project._id}</td>
                    <td className="px-4 py-2">{project.ProjectName}</td>
                    <td className="px-4 py-2">{new Date(project.StartDate).toLocaleDateString()}</td>
                    <td className="px-4 py-2">{new Date(project.EndDate).toLocaleDateString()}</td>
                    <td className="px-4 py-2">{project.Status}</td>
                    <td className="px-4 py-2 flex gap-2">
                      <Button
                        onClick={() => navigate(`/dashboard/projects/${project._id}/edit`)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-md"
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        onClick={() => deleteHandler(project._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md"
                      >
                        <Trash size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
};

export default ProjectListScreen;