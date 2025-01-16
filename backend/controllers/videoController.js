import asyncHandler from 'express-async-handler';
import Video from '../models/VideoModel.js';

// Get all videos
const getVideos = asyncHandler(async (req, res) => {
  const videos = await Video.find();
  res.status(200).json(videos);
});

// Create a new video
const createVideo = asyncHandler(async (req, res) => {
  const { title, description, videoId } = req.body;

  const video = new Video({
    title: 'Sample Title',
    description: 'Sample Description',
    videoId: 'sample_video_id',
  });
  
  const createdVideo = await video.save();
  res.status(201).json(createdVideo);
});

// Get a single video by ID
const getVideoById = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);
  if (!video) return res.status(404).json({ message: 'Video not found' });
  res.status(200).json(video);
});

// Update a video
const updateVideo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, videoId } = req.body;

  const video = await Video.findById(id);

  if (video) {
    video.title = title;
    video.description = description;
    video.videoId = videoId;

    const updatedVideo = await video.save();
    res.status(200).json(updatedVideo);
  } else {
    res.status(404).json({ message: 'Video not found' });
  }
});

// Delete a video
const deleteVideo = asyncHandler(async (req, res) => {
  console.log(`Attempting to delete video with ID: ${req.params.id}`); 
  const deletedVideo = await Video.findByIdAndDelete(req.params.id);
  if (!deletedVideo) {
    console.log(`Video not found with ID: ${req.params.id}`);
    return res.status(404).json({ message: 'Video not found' });
  }
  console.log(`Successfully deleted video with ID: ${req.params.id}`); 
  res.status(200).json({ message: 'Video deleted successfully' });
});

export {
  getVideos,
  createVideo,
  getVideoById,
  updateVideo,
  deleteVideo
};
