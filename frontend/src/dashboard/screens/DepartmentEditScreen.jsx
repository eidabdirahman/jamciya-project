import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  useGetDepartmentByIdQuery, 
  useUpdateDepartmentMutation 
} from '../../slices/departmentsApiSlice';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea'; // Importing Textarea component
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
    <div className="container mx-auto p-6 bg-gradient-to-r from-blue-50 via-green-50 to-yellow-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Edit Department</h1>
      {isLoading || loadingUpdate ? (
        <div className="flex justify-center items-center h-48">
          <Loader size={48} color="gray" className="spinner" />
        </div>
      ) : error ? (
        <div className="text-red-600 text-center">{error.data.message}</div>
      ) : (
        <form onSubmit={submitHandler} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
          <div className="flex flex-col">
            <label htmlFor="departmentName" className="text-lg font-medium text-gray-700">Department Name</label>
            <Input
              id="departmentName"
              type="text"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              required
              className="mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="departmentHead" className="text-lg font-medium text-gray-700">Department Head</label>
            <Input
              id="departmentHead"
              type="text"
              value={departmentHead}
              onChange={(e) => setDepartmentHead(e.target.value)}
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
          <div className="flex flex-col">
            <label htmlFor="image" className="text-lg font-medium text-gray-700">Image</label>
            <Input
              id="image"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button type="submit" variant="contained" color="primary" className="w-full mt-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition duration-300">
            Update Department
          </Button>
        </form>
      )}
    </div>
  );
};

export default DepartmentEditScreen;