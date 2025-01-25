import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useGetProjectByIdQuery } from '@/slices/projectApiSlice';
import { toast } from 'react-hot-toast';
import { Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const { data: project, isLoading, error } = useGetProjectByIdQuery(id);

  if (error) {
    toast.error("Error loading project details");
    console.error("Error loading project details:", error);
  }

  return (
    <div className="container mx-auto p-4">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <p>Error loading project details</p>
      ) : (
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
              <img src={project.image || 'default-image-url.jpg'} alt={project.ProjectName} className="w-full h-auto object-cover" />
            </div>
            <div className="w-full md:w-8/12 p-4">
              <h2 className="text-2xl font-bold mb-2">{project.ProjectName}</h2>
              <p>{project.Description}</p>
              <p>Start Date: {new Date(project.StartDate).toLocaleDateString()}</p>
              <p>End Date: {new Date(project.EndDate).toLocaleDateString()}</p>
              <p>Status: {project.Status}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProjectDetailPage;
``