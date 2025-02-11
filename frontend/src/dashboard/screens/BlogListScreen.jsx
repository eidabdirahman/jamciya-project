import { Edit, Trash, Loader } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import { 
  useGetBlogsQuery, 
  useDeleteBlogMutation, 
  useCreateBlogMutation 
} from '../../slices/blogsApiSlice.js';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button.jsx';

const BlogListScreen = () => {
  const navigate = useNavigate();
  const { data: blogs, isLoading, error, refetch } = useGetBlogsQuery();
  const [deleteBlog, { isLoading: loadingDelete }] = useDeleteBlogMutation();
  const [createBlog, { isLoading: loadingCreate }] = useCreateBlogMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await deleteBlog(id).unwrap();
        toast.success('Blog deleted successfully');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    }
  };

  const createBlogHandler = async () => {
    if (window.confirm('Are you sure you want to create a new blog?')) {
      try {
        await createBlog().unwrap();
        toast.success('Blog created successfully');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.message || 'An error occurred while creating the blog');
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Blogs</h1>
      <div className="flex justify-end gap-4 mb-4">
        <Button onClick={createBlogHandler} className="bg-green-500 text-white">
          Create Blog
        </Button>
      </div>

      {(loadingCreate || loadingDelete || isLoading) && (
        <div className="text-center py-4">
          <Loader size={48} className="animate-spin mx-auto text-gray-700" />
        </div>
      )}

      {!loadingCreate && !loadingDelete && !isLoading && error ? (
        <div className="text-red-500">{error.data.message}</div>
      ) : (
        blogs && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gray-800 text-white">
                  {['ID', 'Title', 'Date', 'Image', 'Actions'].map((title) => (
                    <th key={title} className="text-left px-4 py-2">{title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog, index) => (
                  <tr key={blog._id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-4 py-2">{blog._id}</td>
                    <td className="px-4 py-2">{blog.Title}</td>
                    <td className="px-4 py-2">{new Date(blog.PublishedAt).toLocaleDateString()}</td>
                    <td className="px-4 py-2">
                      {blog.image && (
                        <img src={blog.image} alt={blog.Title} className="w-12 h-12 rounded-full object-cover" />
                      )}
                    </td>
                    <td className="px-4 py-2 flex gap-2">
                      <Button
                        onClick={() => navigate(`/dashboard/blogs/${blog._id}/edit`)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-md"
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        onClick={() => deleteHandler(blog._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md"
                      >
                        <Trash size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
};

export default BlogListScreen;