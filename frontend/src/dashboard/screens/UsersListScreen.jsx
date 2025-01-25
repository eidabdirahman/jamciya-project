import { Edit, Trash, Loader } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import { 
  useGetUsersQuery, 
  useDeleteUserMutation, 
  useRegisterMutation } from '@/slices/usersApiSlice.js'; // Updated here
import toast from 'react-hot-toast';
  import { Button } from '@/components/ui/button.jsx';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableRow } from '@/components/ui/table.jsx';

const UsersListScreen = () => {
  const navigate = useNavigate();
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();
  const [register, { isLoading: loadingRegister }] = useRegisterMutation(); // Updated here

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        console.log(`Attempting to delete user with ID: ${id}`);
        await deleteUser(id).unwrap();
        toast.success('User deleted successfully');
        refetch();
      } catch (err) {
        console.error('Error deleting user:', err);
        toast.error(err?.data?.message || err.message);
      }
    }
  };

  const createUserHandler = async () => {
    if (window.confirm('Are you sure you want to create a new user?')) {
      try {
        await register().unwrap(); // Updated here
        toast.success('User created successfully');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.message || 'An error occurred while creating the user');
      }
    }
  };

  return (
    <div>
      <h1>Users</h1>
      <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '16px 0' }}>
        <Button onClick={createUserHandler} variant="contained" color="blue">
          Create User
        </Button>
      </div>

      {(loadingRegister || loadingDelete || isLoading) && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Loader size={48} color="black" className="spinner" />
        </div>
      )}

      {!loadingRegister && !loadingDelete && !isLoading && error ? (
        <div style={{ color: 'red' }}>{error.data.message}</div>
      ) : (
        users && (
          <Table role="table"> {/* Added role attribute here */}
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Date Joined</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => navigate(`/dashboard/users/${user._id}/edit`)}
                      variant="contained"
                      color="default"
                      size="small"
                    >
                      <Edit size={16} color="blue" />
                    </Button>
                    <Button
                      onClick={() => deleteHandler(user._id)}
                      variant="contained"
                      size="small"
                      style={{ marginLeft: '8px' }}
                    >
                      <Trash size={16} color="red" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
      )}
    </div>
  );
};

export default UsersListScreen;
