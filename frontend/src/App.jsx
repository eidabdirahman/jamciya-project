import { router } from './Router.jsx';
import { RouterProvider } from 'react-router-dom';

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
