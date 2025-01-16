import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import { useGetVideosQuery } from '@/slices/videoApiSlice';
import { toast, Toaster } from 'react-hot-toast';
import { Loader } from 'lucide-react';

const VideosPage = () => {
  const { data: videos, isLoading, error } = useGetVideosQuery();

  if (error) {
    toast.error("Error loading videos");
    console.error("Error loading videos:", error);
  }

  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-4">Videos</h1>
      </motion.div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <p>Error loading videos</p>
      ) : (
        <Card className="bg-white shadow-md rounded-lg overflow-hidden">
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {videos.map((video) => (
                <motion.div
                  key={video._id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="bg-white shadow-md rounded-lg overflow-hidden">
                    <CardContent className="p-4">
                      <iframe
                        src={`https://www.youtube.com/embed/${video.videoId}`}
                        title={`YouTube video ${video.videoId}`}
                        className="w-full h-48 object-cover mb-4"
                        allowFullScreen
                      ></iframe>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <Link to="/videos">
                <Button className="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-700">
                  See More
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VideosPage;
