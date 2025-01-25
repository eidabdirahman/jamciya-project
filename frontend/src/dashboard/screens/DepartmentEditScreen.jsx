import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  useGetDepartmentByIdQuery, 
  useUpdateDepartmentMutation 
} from '../../slices/departmentsApiSlice';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader } from 'lucide-react';

const DepartmentEditScreen = () => {
  const { id: departmentId } = useParams();
  const navigate = useNavigate();

  const { data: department, isLoading, error } = useGetDepartmentByIdQuery(departmentId);
  const [updateDepartment, { isLoading: loadingUpdate }] = useUpdateDepartmentMutation();

  const [departmentName, setDepartmentName] = useState('');
  const [departmentHead, setDepartmentHead] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (department) {
      setDepartmentName(department.DepartmentName);
      setDepartmentHead(department.DepartmentHead);
      setDescription(department.Description);
      setImage(null);
    }
  }, [department]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to update this department?')) {
      try {
        const formData = new FormData();
        formData.append('DepartmentName', departmentName);
        formData.append('DepartmentHead', departmentHead);
        formData.append('Description', description);
        if (image) {
          formData.append('Image', image);
        }
        
        await updateDepartment({ id: departmentId, ...Object.fromEntries(formData) }).unwrap();
        toast.success('Department updated successfully');
        navigate('/dashboard/departments');
      } catch (err) {
        toast.error(err?.data?.message || err.message || 'An error occurred while updating the department');
      }
    }
  };

  return (
    <div>
      <h1>Edit Department</h1>
      {isLoading || loadingUpdate ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Loader size={48} color="gray" className="spinner" />
        </div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error.data.message}</div>
      ) : (
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="departmentName">Department Name</label>
            <Input
              id="departmentName"
              type="text"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="departmentHead">Department Head</label>
            <Input
              id="departmentHead"
              type="text"
              value={departmentHead}
              onChange={(e) => setDepartmentHead(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <Input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="image">Image</label>
            <Input
              id="image"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <Button type="submit" variant="contained" color="primary">
            Update Department
          </Button>
        </form>
      )}
    </div>
  );
};

export default DepartmentEditScreen;
