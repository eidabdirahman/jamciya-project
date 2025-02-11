import { Edit, Trash, Loader } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import { 
  useGetVideosQuery,
  useDeleteVideoMutation, 
  useCreateVideoMutation 
} from '../../slices/videoApiSlice.js';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button.jsx';

const VideoListScreen = () => {
  const navigate = useNavigate();
  const { data: videos, isLoading, error, refetch } = useGetVideosQuery();
  const [deleteVideo, { isLoading: loadingDelete }] = useDeleteVideoMutation();
  const [createVideo, { isLoading: loadingCreate }] = useCreateVideoMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      try {
        await deleteVideo(id).unwrap();
        toast.success('Video deleted successfully');
        refetch();
      } catch (err) {
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
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Videos</h1>
      <div className="flex justify-end gap-4 mb-4">
        <Button onClick={createVideoHandler} className="bg-green-500 text-white">
          Create Video
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
        videos && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gray-800 text-white">
                  {['ID', 'Title', 'Date', 'Actions'].map((title) => (
                    <th key={title} className="text-left px-4 py-2">{title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {videos.map((video, index) => (
                  <tr key={video._id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-4 py-2">{video._id}</td>
                    <td className="px-4 py-2">{video.title}</td>
                    <td className="px-4 py-2">{new Date(video.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-2 flex gap-2">
                      <Button
                        onClick={() => navigate(`/dashboard/videos/${video._id}/edit`)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-md"
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        onClick={() => deleteHandler(video._id)}
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

export default VideoListScreen;