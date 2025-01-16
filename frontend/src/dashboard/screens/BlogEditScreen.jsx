import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  useGetBlogByIdQuery, 
  useUpdateBlogMutation } from '../../slices/blogsApiSlice.js';
import toast, { Toaster } from 'react-hot-toast';
import { Button } from '@/components/ui/button.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Loader } from 'lucide-react';

const BlogEditScreen = () => {
  const { id: blogId } = useParams();
  const navigate = useNavigate();

  const { data: blog, isLoading, error } = useGetBlogByIdQuery(blogId);
  const [updateBlog, { isLoading: loadingUpdate }] = useUpdateBlogMutation();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (blog) {
      setTitle(blog.Title);
      setContent(blog.Content);
      setPublishedDate(blog.PublishedAt);
      setImage(null); // Reset image input
    }
  }, [blog]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to update this blog?')) {
      try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('publishedDate', publishedDate);
        if (image) {
          formData.append('image', image);
        }
  
        await updateBlog({ id: blogId, title, content, publishedDate, image }).unwrap();
        toast.success('Blog updated successfully');
        navigate('/dashboard/blogs');
      } catch (err) {
        toast.error(err?.data?.message || err.message || 'An error occurred while updating the blog');
      }
    }
  };
  
  return (
    <div>
      <Toaster />
      <h1>Edit Blog</h1>
      {isLoading || loadingUpdate ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Loader size={48} color="gray" className="spinner" />
        </div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error.data.message}</div>
      ) : (
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="title">Title</label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="content">Content</label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="publishedDate">Published Date</label>
            <Input
              id="publishedDate"
              type="date"
              value={publishedDate}
              onChange={(e) => setPublishedDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="image">Image</label>
            <Input
              id="image"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <Button type="submit" variant="contained" color="primary">
            Update Blog
          </Button>
        </form>
      )}
    </div>
  );
};

export default BlogEditScreen;
