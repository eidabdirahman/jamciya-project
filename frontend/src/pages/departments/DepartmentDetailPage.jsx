import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useGetDepartmentByIdQuery } from '@/slices/departmentsApiSlice';
import { toast } from 'react-hot-toast';
import { Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DepartmentDetailPage = () => {
  const { id } = useParams();
  const { data: department, isLoading, error } = useGetDepartmentByIdQuery(id);

  if (error) {
    toast.error("Error loading department details");
    console.error("Error loading department details:", error);
  }

  return (
    <div className="container mx-auto p-4 relative">
      {isLoading && (
        <div className="absolute top-0 left-0 w-full flex items-center justify-center bg-white bg-opacity-75">
          <Loader className="animate-spin text-gray-500 m-3" size={40} />
        </div>
      )}
      <motion.h1
        className="text-3xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Departments
      </motion.h1>

      {error ? (
        <p>Error loading department details</p>
      ) : (
        department && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <Button className="bg-blue-500 text-white rounded-full px-4 py-2 mt-2 hover:bg-blue-700" onClick={() => window.history.back()}>
              Go Back
            </Button>
            <div className="flex flex-wrap md:flex-nowrap">
              <div className="w-full md:w-4/12">
                <img src={department.Image || 'default-image-url.jpg'} alt={department.DepartmentName} className="w-full h-auto object-cover" />
              </div>
              <div className="w-full md:w-8/12 p-4">
                <h2 className="text-2xl font-bold mb-2">{department.DepartmentName}</h2>
                <p>Head: {department.DepartmentHead}</p>
                <p>{department.Description}</p>
                <p>Created At: {new Date(department.CreatedAt).toLocaleDateString()}</p>
              </div>
            </div>
          </motion.div>
        )
      )}
    </div>
  );
};

export default DepartmentDetailPage;
