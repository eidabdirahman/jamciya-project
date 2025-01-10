// router.jsx
import { createBrowserRouter, Outlet } from 'react-router-dom';
import Header from './Pages/components/Header';
import Footer from './Pages/components/Footer';
import About from './pages/components/About/About';
import MainHome from './Pages/components/MainHome';
import NotFound from './Pages/NotFound/NotFound';
import Newspage from './pages/components/News/Newspage';
import Departmentpage from './pages/components/departments/Departmentpage';
import Blogpage from './pages/components/Blogs/Blogpage';
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
      { path: '/about', element: <About /> },
      { path: '/departments', element: < Departmentpage/> },
      { path: '/news', element: <Newspage />},
      { path: '/projects', element: <div>Projects Page</div> },
      { path: '/blog', element: <Blogpage/> },
      { path: '/contact', element: <div>Contact Page</div> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
