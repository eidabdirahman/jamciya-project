import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetVideoByIdQuery,
  useUpdateVideoMutation
} from '../../slices/videoApiSlice.js';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Loader } from 'lucide-react';

const VideoEditScreen = () => {
  const { id: videoId } = useParams();
  const navigate = useNavigate();

  const { data: video, isLoading, error } = useGetVideoByIdQuery(videoId);
  const [updateVideo, { isLoading: loadingUpdate }] = useUpdateVideoMutation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoIdInput, setVideoIdInput] = useState('');

  useEffect(() => {
    if (video) {
      setTitle(video.title);
      setDescription(video.description);
      setVideoIdInput(video.videoId);
    }
  }, [video]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to update this video?')) {
      try {
        await updateVideo({ id: videoId, title, description, videoId: videoIdInput }).unwrap();
        toast.success('Video updated successfully');
        navigate('/dashboard/videos');
      } catch (err) {
        toast.error(err?.data?.message || err.message || 'An error occurred while updating the video');
      }
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-blue-50 via-green-50 to-yellow-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Edit Video</h1>
      {isLoading || loadingUpdate ? (
        <div className="flex justify-center items-center h-48">
          <Loader size={48} color="gray" className="spinner" />
        </div>
      ) : error ? (
        <div className="text-red-600 text-center">{error.data.message}</div>
      ) : (
        <form onSubmit={submitHandler} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
          <div className="flex flex-col">
            <label htmlFor="title" className="text-lg font-medium text-gray-700">Title</label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="text-lg font-medium text-gray-700">Description</label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="videoId" className="text-lg font-medium text-gray-700">Video ID</label>
            <Input
              id="videoId"
              type="text"
              value={videoIdInput}
              onChange={(e) => setVideoIdInput(e.target.value)}
              required
              className="mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button type="submit" variant="contained" color="primary" className="w-full mt-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition duration-300">
            Update Video
          </Button>
        </form>
      )}
    </div>
  );
};

export default VideoEditScreen;