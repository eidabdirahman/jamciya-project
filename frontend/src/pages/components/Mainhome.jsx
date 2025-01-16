import Hero from './Hero/HeroSection';
import Newspage from './Blogs/BlogsPage';
import ProjectPage from './Projects/Projectspage';
import Partners from './Partners/Partnerspage';
import PhotoGallery from './PhotoGallery/PhotoGallery';
import VideoGallery from './videoGallery/VideoGallery';
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
