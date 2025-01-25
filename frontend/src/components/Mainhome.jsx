import Hero from '@/pages/Hero/HeroSection';
import Newspage from '@/pages/Blogs/BlogsPage';
import ProjectPage from '@/pages/Projects/Projectspage';
import Partners from '@/pages/Partners/Partnerspage';
import PhotoGallery from '@/pages/PhotoGallery/PhotoGallery';
import VideoGallery from '@/pages/videoGallery/VideoGallery';
const Mainhome = () => {
  return (
    <div>
      <Hero />
      <Newspage />
      <ProjectPage />
      <Partners />
      <PhotoGallery />
      <VideoGallery />
   

  </div>
      
    
  )
}

export default Mainhome
