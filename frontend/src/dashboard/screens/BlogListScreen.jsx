import { Edit, Trash, Loader } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import { 
  useGetBlogsQuery, 
  useDeleteBlogMutation, 
  useCreateBlogMutation } from '../../slices/blogsApiSlice.js';
import toast, { Toaster } from 'react-hot-toast';
import { Button } from '@/components/ui/button.jsx';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table.jsx';

const BlogListScreen = () => {
  const navigate = useNavigate();
  const { data: blogs, isLoading, error, refetch } = useGetBlogsQuery();
  const [deleteBlog, { isLoading: loadingDelete }] = useDeleteBlogMutation();
  const [createBlog, { isLoading: loadingCreate }] = useCreateBlogMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        console.log(`Attempting to delete blog with ID: ${id}`);
        await deleteBlog(id).unwrap();
        toast.success('Blog deleted successfully');
        refetch();
      } catch (err) {
        console.error('Error deleting blog:', err);
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
    <div>
      <Toaster />
      <h1>Blogs</h1>
      <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '16px 0' }}>
        <Button onClick={createBlogHandler} variant="contained" color="blue">
          Create Blog
        </Button>
      </div>

      {(loadingCreate || loadingDelete || isLoading) && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Loader size={48} color="black" className="spinner" />
        </div>
      )}

      {!loadingCreate && !loadingDelete && !isLoading && error ? (
        <div style={{ color: 'red' }}>{error.data.message}</div>
      ) : (
        blogs && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {blogs.map((blog) => (
                <TableRow key={blog._id}>
                  <TableCell>{blog._id}</TableCell>
                  <TableCell>{blog.Title}</TableCell>
                  <TableCell>{new Date(blog.PublishedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <img src={blog.image} alt={blog.Title} style={{ width: '50px', height: '50px' }} />
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => navigate(`/dashboard/blogs/${blog._id}/edit`)}
                      variant="contained"
                      color="default"
                      size="small"
                    >
                      <Edit size={16} color="blue" />
                    </Button>
                    <Button
                      onClick={() => deleteHandler(blog._id)}
                      variant="contained"
                      size="small"
                      style={{ marginLeft: '8px' }}
                    >
                      <Trash size={16} color="red" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
      )}
    </div>
  );
};

export default BlogListScreen;
