import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useGetBlogsQuery } from '@/slices/blogsApiSlice';
import { toast } from 'react-hot-toast';
import { Loader } from 'lucide-react';

const BlogsPage = () => {
  const { data: blogs, isLoading, error } = useGetBlogsQuery();
     
  if (error) {
    toast.error("Error loading blogs");
    console.error("Error loading blogs:", error);
  }

  return (
    <div className="container mx-auto p-4">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-4">Blogs</h1>
      </motion.div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <p>Error loading blogs</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white shadow-md rounded-lg overflow-hidden">
                <CardHeader>
                  <img src={blog.image || 'default-image-url.jpg'} alt={blog.Title} className="w-full h-40 object-cover" />
                  <CardTitle className="truncate">{blog.Title}</CardTitle>
                  <CardDescription className="truncate">
                    {blog.Content.substring(0, 100)}...
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{blog.Content.substring(0, 150)}...</p> {/* Displaying a brief overview */}
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <span>Published on: {new Date(blog.PublishedAt).toLocaleDateString()}</span>
                  <Link to={`/blog/${blog._id}`}>
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

export default BlogsPage;
