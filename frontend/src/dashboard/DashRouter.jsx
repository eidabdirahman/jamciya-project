import { Outlet,  } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const DashRouter = () => {

//   useEffect(() => {
//     if (!user) {
//       navigate('/signin');
//     } else if (user.role !== Role.ADMIN) {
//       navigate('/profile');
//     }
//   }, [user, navigate]);

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
