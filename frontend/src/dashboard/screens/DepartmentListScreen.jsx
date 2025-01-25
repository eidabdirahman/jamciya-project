import { Edit, Trash, Loader } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import { 
    useGetDepartmentsQuery, 
    useDeleteDepartmentMutation, 
    useCreateDepartmentMutation } from '../../slices/departmentsApiSlice';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table';

const DepartmentListScreen = () => {
  const navigate = useNavigate();
  const { data: departments, isLoading, error, refetch } = useGetDepartmentsQuery();
  const [deleteDepartment, { isLoading: loadingDelete }] = useDeleteDepartmentMutation();
  const [createDepartment, { isLoading: loadingCreate }] = useCreateDepartmentMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        console.log(`Attempting to delete department with ID: ${id}`);
        await deleteDepartment(id).unwrap();
        toast.success('Department deleted successfully');
        refetch();
      } catch (err) {
        console.error('Error deleting department:', err);
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
    <div>
      <h1>Departments</h1>
      <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '16px 0' }}>
        <Button onClick={createDepartmentHandler} variant="contained" color="blue">
          Create Department
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
        departments && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Head</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departments.map((department) => (
                <TableRow key={department._id}>
                  <TableCell>{department._id}</TableCell>
                  <TableCell>{department.DepartmentName}</TableCell>
                  <TableCell>{department.DepartmentHead}</TableCell>
                  <TableCell>
                    <img src={department.Image || 'default-image-url.jpg'} alt={department.DepartmentName} style={{ width: '50px', height: '50px' }} />
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => navigate(`/dashboard/departments/${department._id}/edit`)}
                      variant="contained"
                      color="default"
                      size="small"
                    >
                      <Edit size={16} color="blue" />
                    </Button>
                    <Button
                      onClick={() => deleteHandler(department._id)}
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

export default DepartmentListScreen;
