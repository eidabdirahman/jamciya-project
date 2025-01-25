import { createBrowserRouter, Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MainHome from '@/components/Mainhome';
import About from '@/pages/About/About';
import ContactPage from '@/pages/Contact/ContactPage';
import NotFound from '@/Pages/NotFound/NotFound';
import Departmentpage from '@/pages/departments/Departmentpage';
import DepartmentDetailPage from '@/pages/departments/DepartmentDetailPage';
import Memberpage from '@/pages/member/Memberpage';
import BlogsPag from '@/pages/Blogs/Blogspage';
import BlogDetailPage from '@/pages/Blogs/BlogDetailPage';
import ProjectPage from '@/pages/Projects/Projectspage';
import ProjectDetailPage from '@/pages/Projects/ProjectDetailPage';
import DashRouter from '@/dashboard/DashRouter';
import LoginPage from '@/pages/LoginPage';
import ProfileScreen from '@/dashboard/screens/ProfileScreen';
import BlogListScreen from '@/dashboard/screens/BlogListScreen';
import BlogEditScreen from '@/dashboard/screens/BlogEditScreen';
import DepartmentListScreen from '@/dashboard/screens/DepartmentListScreen';
import DepartmentEditScreen from '@/dashboard/screens/DepartmentEditScreen';
import ProjectListScreen from '@/dashboard/screens/ProjectListScreen';
import ProjectEditScreen from '@/dashboard/screens/ProjectEditScreen';
import PartnerListScreen from '@/dashboard/screens/PartnerListScreen';
import PartnerEditScreen from '@/dashboard/screens/PartnerEditScreen';
import VideoListScreen from '@/dashboard/screens/VideoListScreen';
import VideoEditScreen from '@/dashboard/screens/VideoEditScreen';
import UsersListScreen from '@/dashboard/screens/UsersListScreen';
import UserEditScreen from '@/dashboard/screens/UserEditScreen';

// Layout component
const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Header */}
      <Header />

      {/* Content Area - Avoids Overlap with Fixed Header */}
      <div className="flex-grow mt-20">
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
      { path: 'department/:id', element: < DepartmentDetailPage/> },
      { path: 'projects', element: <ProjectPage/> },
      { path: 'project/:id', element: <ProjectDetailPage/> },
      { path: 'blogs', element: <BlogsPag/> },
      { path: 'blog/:id', element: <BlogDetailPage/> },
      { path: 'member', element: <Memberpage/> },
      { path: 'contact', element: <ContactPage/> },
      { path: 'signin', element: <LoginPage /> },
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
      { path: 'users', element: <UsersListScreen/> },
      { path: 'users/:id/edit', element: <UserEditScreen/> },

    ],
  },
]);
