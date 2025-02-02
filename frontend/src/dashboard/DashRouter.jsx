import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials } from '@/slices/authSlice';
import Header from "./header";
import Sidebar from "./Sidebar";

const DashRouter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    if (!user) {
      navigate('/signin');
    } else {
      dispatch(setCredentials(user));
      if (user.role === "admin" || user.role === "superadmin") {
        navigate('/dashboard');
      }
    }
  }, [user, navigate, dispatch]);

  return (
    <div className="flex w-full h-full min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden sm:flex flex-shrink-0 w-64 bg-white border-r border-gray-200">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header />

        {/* Main Content Area */}
        <div className="flex-1 bg-gray-100 w-full h-full text-black overflow-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashRouter;
