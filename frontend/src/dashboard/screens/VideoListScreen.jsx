import { Edit, Trash, Loader } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import { useGetVideosQuery, useDeleteVideoMutation, useCreateVideoMutation } from '../../slices/videoApiSlice.js';
import toast, { Toaster } from 'react-hot-toast';
import { Button } from '@/components/ui/button.jsx';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table.jsx';

const VideoListScreen = () => {
  const navigate = useNavigate();
  const { data: videos, isLoading, error, refetch } = useGetVideosQuery();
  const [deleteVideo, { isLoading: loadingDelete }] = useDeleteVideoMutation();
  const [createVideo, { isLoading: loadingCreate }] = useCreateVideoMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        console.log(`Attempting to delete video with ID: ${id}`);
        await deleteVideo(id).unwrap();
        toast.success('Video deleted successfully');
        refetch();
      } catch (err) {
        console.error('Error deleting video:', err);
        toast.error(err?.data?.message || err.message);
      }
    }
  };

  const createVideoHandler = async () => {
    if (window.confirm('Are you sure you want to create a new video?')) {
      try {
        await createVideo().unwrap();
        toast.success('Video created successfully');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.message || 'An error occurred while creating the video');
      }
    }
  };

  return (
    <div>
      <Toaster />
      <h1>Videos</h1>
      <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '16px 0' }}>
        <Button onClick={createVideoHandler} variant="contained" color="blue">
          Create Video
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
        videos && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {videos.map((video) => (
                <TableRow key={video._id}>
                  <TableCell>{video._id}</TableCell>
                  <TableCell>{video.title}</TableCell>
                  <TableCell>{new Date(video.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => navigate(`/dashboard/videos/${video._id}/edit`)}
                      variant="contained"
                      color="default"
                      size="small"
                    >
                      <Edit size={16} color="blue" />
                    </Button>
                    <Button
                      onClick={() => deleteHandler(video._id)}
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

export default VideoListScreen;
