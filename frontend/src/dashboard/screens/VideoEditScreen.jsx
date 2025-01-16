import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetVideoByIdQuery,
  useUpdateVideoMutation
} from '../../slices/videoApiSlice.js';
import toast, { Toaster } from 'react-hot-toast';
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
    <div>
      <Toaster />
      <h1>Edit Video</h1>
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
            <label htmlFor="description">Description</label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="videoId">Video ID</label>
            <Input
              id="videoId"
              type="text"
              value={videoIdInput}
              onChange={(e) => setVideoIdInput(e.target.value)}
              required
            />
          </div>
          <Button type="submit" variant="contained" color="primary">
            Update Video
          </Button>
        </form>
      )}
    </div>
  );
};

export default VideoEditScreen;
