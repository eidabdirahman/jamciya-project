import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  useGetBlogByIdQuery, 
  useUpdateBlogMutation 
} from '../../slices/blogsApiSlice.js';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Loader } from 'lucide-react';

const BlogEditScreen = () => {
  const { id: blogId } = useParams();
  const navigate = useNavigate();

  const { data: blog, isLoading, error } = useGetBlogByIdQuery(blogId);
  const [updateBlog, { isLoading: loadingUpdate }] = useUpdateBlogMutation();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    publishedDate: '',
    image: null,
  });

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.Title,
        content: blog.Content,
        publishedDate: blog.PublishedAt.split('T')[0], // Assuming PublishedAt is in ISO format
        image: null,
      });
    }
  }, [blog]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to update this blog?')) {
      try {
        const formDataToSubmit = new FormData();
        formDataToSubmit.append('title', formData.title);
        formDataToSubmit.append('content', formData.content);
        formDataToSubmit.append('publishedDate', formData.publishedDate);

        if (formData.image) {
          formDataToSubmit.append('image', formData.image);
        } else {
          formDataToSubmit.append('image', blog.image); // Ensure existing image is included
        }

        await updateBlog({ id: blogId, ...Object.fromEntries(formDataToSubmit) }).unwrap();
        toast.success('Blog updated successfully');
        navigate('/dashboard/blogs');
      } catch (err) {
        toast.error(err?.data?.message || err.message || 'An error occurred while updating the blog');
      }
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-blue-50 via-green-50 to-yellow-50">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Edit Blog</h1>

      {isLoading || loadingUpdate ? (
        <div className="flex justify-center items-center h-48">
          <Loader size={48} color="gray" className="spinner" />
        </div>
      ) : error ? (
        <div className="text-red-600 text-center">{error.data.message}</div>
      ) : (
        <form onSubmit={submitHandler} className="space-y-6 bg-white p-8 rounded-lg shadow-lg">
          <div className="flex flex-col">
            <label htmlFor="title" className="text-lg font-medium text-gray-700">Title</label>
            <Input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="content" className="text-lg font-medium text-gray-700">Content</label>
            <Textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              className="mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="publishedDate" className="text-lg font-medium text-gray-700">Published Date</label>
            <Input
              id="publishedDate"
              name="publishedDate"
              type="date"
              value={formData.publishedDate}
              onChange={handleChange}
              required
              className="mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="image" className="text-lg font-medium text-gray-700">Image</label>
            <Input
              id="image"
              name="image"
              type="file"
              onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
              className="mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <Button type="submit" variant="contained" color="primary" className="w-full mt-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-teal-400 text-white hover:from-blue-400 hover:to-teal-300 transition-all duration-300">
            Update Blog
          </Button>
        </form>
      )}
    </div>
  );
};

export default BlogEditScreen;