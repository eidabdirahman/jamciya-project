import { Helmet } from 'react-helmet';
import Hero from '@/pages/Hero/HeroSection';
import Newspage from '@/pages/Blogs/BlogsPage';
import ProjectPage from '@/pages/Projects/Projectspage';
import Partners from '@/pages/Partners/Partnerspage';
import PhotoGallery from '@/pages/PhotoGallery/PhotoGallery';
import VideoGallery from '@/pages/videoGallery/VideoGallery';

const Mainhome = () => {
  return (
    <div>
      {/* Metadata with react-helmet */}
      <Helmet>
        <title>Welcome to Jamciya | Home</title>
        <meta
          name="description"
          content="Explore Jamciya's latest blogs, projects, partners, photo gallery, and video gallery. Stay updated with our activities and collaborations."
        />
        <meta
          name="keywords"
          content="Jamciya, blogs, projects, partners, photo gallery, video gallery, collaboration"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Helmet>

      {/* Sections */}
      <Hero />
      <Newspage />
      <ProjectPage />
      <Partners />
      <PhotoGallery />
      <VideoGallery />
    </div>
  );
};

export default Mainhome;
