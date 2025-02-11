import { Edit, Trash, Loader } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import { 
    useGetDepartmentsQuery, 
    useDeleteDepartmentMutation, 
    useCreateDepartmentMutation 
} from '../../slices/departmentsApiSlice';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button.jsx';

const DepartmentListScreen = () => {
  const navigate = useNavigate();
  const { data: departments, isLoading, error, refetch } = useGetDepartmentsQuery();
  const [deleteDepartment, { isLoading: loadingDelete }] = useDeleteDepartmentMutation();
  const [createDepartment, { isLoading: loadingCreate }] = useCreateDepartmentMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      try {
        await deleteDepartment(id).unwrap();
        toast.success('Department deleted successfully');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    }
  };

  const createDepartmentHandler = async () => {
    if (window.confirm('Are you sure you want to create a new department?')) {
      try {
        await createDepartment().unwrap();
        toast.success('Department created successfully');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.message || 'An error occurred while creating the department');
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Departments</h1>
      <div className="flex justify-end gap-4 mb-4">
        <Button onClick={createDepartmentHandler} className="bg-green-500 text-white">
          Create Department
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
        departments && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gray-800 text-white">
                  {['ID', 'Department Name', 'Department Head', 'Image', 'Actions'].map((title) => (
                    <th key={title} className="text-left px-4 py-2">{title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {departments.map((department, index) => (
                  <tr key={department._id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-4 py-2">{department._id}</td>
                    <td className="px-4 py-2">{department.DepartmentName}</td>
                    <td className="px-4 py-2">{department.DepartmentHead}</td>
                    <td className="px-4 py-2">
                      <img 
                        src={department.Image || 'default-image-url.jpg'} 
                        alt={department.DepartmentName} 
                        className="w-12 h-12 object-cover rounded-full" 
                      />
                    </td>
                    <td className="px-4 py-2 flex gap-2">
                      <Button
                        onClick={() => navigate(`/dashboard/departments/${department._id}/edit`)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-md"
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        onClick={() => deleteHandler(department._id)}
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

export default DepartmentListScreen;