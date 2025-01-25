import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useGetBlogByIdQuery } from '@/slices/blogsApiSlice';
import { toast } from 'react-hot-toast';
import { Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BlogDetailPage = () => {
  const { id } = useParams();
  const { data: blog, isLoading, error } = useGetBlogByIdQuery(id);

  if (error) {
    toast.error("Error loading blog details");
    console.error("Error loading blog details:", error);
  }

  return (
    <div className="container mx-auto p-4">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <p>Error loading blog details</p>
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
              <img src={blog.image || 'default-image-url.jpg'} alt={blog.Title} className="w-full h-auto object-cover" />
            </div>
            <div className="w-full md:w-8/12 p-4">
              <h2 className="text-2xl font-bold mb-2">{blog.Title}</h2>
              <p>{blog.Content}</p>
              <p>Published on: {new Date(blog.PublishedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BlogDetailPage;
