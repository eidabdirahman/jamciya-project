import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { useGetProjectsQuery } from '@/slices/projectApiSlice';
import { toast } from 'react-hot-toast';
import { Loader } from 'lucide-react';

const ProjectPage = () => {
  const { data: projects, isLoading, error } = useGetProjectsQuery();

  if (error) {
    toast.error("Error loading projects");
    console.error("Error loading projects:", error);
  }

  return (
    <div className="container mx-auto p-4">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-4">Projects</h1>
      </motion.div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <p>Error loading projects</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white shadow-md rounded-lg overflow-hidden" style={{ height: '100%' }}>
                <CardHeader>
                  <img src={project.image || 'default-image-url.jpg'} alt={`Project ${index + 1}`} className="w-full h-56 object-cover" />
                  <CardTitle>{project.ProjectName}</CardTitle>
                </CardHeader>
                <CardContent className="truncate">
                  <p>{project.Description.substring(0, 150)}...</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <span>Start Date: {new Date(project.StartDate).toLocaleDateString()}</span>
                  <span>End Date: {new Date(project.EndDate).toLocaleDateString()}</span>
                  <span>Status: {project.Status}</span>
                  <Link to={`/project/${project._id}`}>
                    <Button className="bg-blue-500 text-white rounded-full px-4 py-2 mt-2 hover:bg-blue-700">
                      Read More
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

export default ProjectPage;
