import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useGetDepartmentsQuery } from '@/slices/departmentsApiSlice';
import { toast } from 'react-hot-toast';
import { Loader } from 'lucide-react';

const DepartmentPage = () => {
  const { data: departments, isLoading, error } = useGetDepartmentsQuery();

  if (error) {
    toast.error("Error loading departments");
    console.error("Error loading departments:", error);
  }

  return (
    <div className="container mx-auto p-4 mt-4 relative">
      {isLoading && (
        <div className="absolute top-0 left-0 w-full flex items-center justify-center bg-white bg-opacity-75">
          <Loader className="animate-spin text-gray-500 m-3" size={40} />
        </div>
      )}
      <motion.h1
        className="text-3xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Departments
      </motion.h1>

      {error ? (
        <p>Error loading departments</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {departments && departments.map((department, index) => (
            <motion.div
              key={department._id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white shadow-md rounded-lg overflow-hidden">
                <CardHeader>
                  <img src={department.Image} alt={department.DepartmentName} className="w-full h-80 object-cover" />
                  <CardTitle>{department.DepartmentName}</CardTitle>
                  <CardDescription>{department.DepartmentHead}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{department.Description ? department.Description.substring(0, 100) : ''}...</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <Link to={`/department/${department._id}`}>
                    <Button className="bg-blue-500 text-white rounded-full px-4 py-2 mt-2 hover:bg-blue-700">
                      See More
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DepartmentPage;
