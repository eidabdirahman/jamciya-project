import { createBrowserRouter, Outlet } from 'react-router-dom';
import Header from './Pages/components/Header';
import Footer from './Pages/components/Footer';
import About from './pages/components/About/About';
import MainHome from './Pages/components/MainHome';
import NotFound from './Pages/NotFound/NotFound';
import Departmentpage from './pages/components/departments/Departmentpage';
import Memberpage from './pages/components/member/Memberpage';
import BlogsPag from './pages/components/Blogs/Blogspage';
import ProjectPage from './pages/components/Projects/Projectspage';
import DashRouter from './dashboard/DashRouter';
import LoginPage from './dashboard/LoginPage';
import ProfileScreen from './dashboard/screens/ProfileScreen';
import BlogListScreen from './dashboard/screens/BlogListScreen';
import BlogEditScreen from './dashboard/screens/BlogEditScreen';
import DepartmentListScreen from './dashboard/screens/DepartmentListScreen';
import DepartmentEditScreen from './dashboard/screens/DepartmentEditScreen';
import ProjectListScreen from './dashboard/screens/ProjectListScreen';
import ProjectEditScreen from './dashboard/screens/ProjectEditScreen';
import PartnerListScreen from './dashboard/screens/PartnerListScreen';
import PartnerEditScreen from './dashboard/screens/PartnerEditScreen';
import VideoListScreen from './dashboard/screens/VideoListScreen';
import VideoEditScreen from './dashboard/screens/VideoEditScreen';

// Layout component
const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Header */}
      <Header />

      {/* Content Area - Avoids Overlap with Fixed Header */}
      <div className="flex-grow mt-16">
        <Outlet />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;

// Application Routes
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Main Layout
    children: [
      { path: '/', element: <MainHome /> },
      { path: 'about', element: <About /> },
      { path: 'departments', element: < Departmentpage/> },
      { path: 'projects', element: <ProjectPage/> },
      { path: 'blogs', element: <BlogsPag/> },
      { path: 'member', element: <Memberpage/> },
      { path: 'contact', element: <div>Contact Page</div> },
      { path: 'login', element: <LoginPage /> },  // Moved here
      { path: '*', element: <NotFound /> },
    ],
  },

  // Dashboard Routes
  {
    path: '/dashboard',
    element: <DashRouter />,
    children: [
      { path: 'profile', element: <ProfileScreen /> },
      { path: 'blogs', element: <BlogListScreen /> },
      { path: 'blogs/:id/edit', element: <BlogEditScreen /> },
      { path: 'departments', element: <DepartmentListScreen /> },
      { path: 'departments/:id/edit', element: <DepartmentEditScreen /> },
      { path: 'projects', element: <ProjectListScreen /> },
      { path: 'projects/:id/edit', element: <ProjectEditScreen /> },
      { path: 'partners', element: <PartnerListScreen /> },
      { path: 'partners/:id/edit', element: <PartnerEditScreen /> },
      { path: 'videos', element: <VideoListScreen/> },
      { path: 'videos/:id/edit', element: <VideoEditScreen/> },

    ],
  },
]);
