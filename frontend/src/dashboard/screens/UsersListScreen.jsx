import { Edit, Trash, Loader } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import { 
  useGetUsersQuery, 
  useDeleteUserMutation, 
  useRegisterMutation 
} from '@/slices/usersApiSlice.js'; 
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button.jsx';

const UsersListScreen = () => {
  const navigate = useNavigate();
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();
  const [deleteUser , { isLoading: loadingDelete }] = useDeleteUserMutation();
  const [register, { isLoading: loadingRegister }] = useRegisterMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser (id).unwrap();
        toast.success('User  deleted successfully');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    }
  };

  const createUserHandler = async () => {
    if (window.confirm('Are you sure you want to create a new user?')) {
      try {
        await register().unwrap();
        toast.success('User  created successfully');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.message || 'An error occurred while creating the user');
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="flex justify-end gap-4 mb-4">
        <Button onClick={createUserHandler} className="bg-green-500 text-white">
          Create User
        </Button>
      </div>

      {(loadingRegister || loadingDelete || isLoading) && (
        <div className="text-center py-4">
          <Loader size={48} className="animate-spin mx-auto text-gray-700" />
        </div>
      )}

      {!loadingRegister && !loadingDelete && !isLoading && error ? (
        <div className="text-red-500">{error.data.message}</div>
      ) : (
        users && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gray-800 text-white">
                  {['ID', 'Name', 'Email', 'Date Joined', 'Actions'].map((title) => (
                    <th key={title} className="text-left px-4 py-2">{title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-4 py-2">{user._id}</td>
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-2 flex gap-2">
                      <Button
                        onClick={() => navigate(`/dashboard/users/${user._id}/edit`)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-md"
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        onClick={() => deleteHandler(user._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md"
                      >
                        <Trash size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
};

export default UsersListScreen;