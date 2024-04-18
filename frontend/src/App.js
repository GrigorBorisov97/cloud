import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';

import Explorer from './pages/Explorer';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Explorer />,
  },
  {
    path: "/upload",
    element: <div>Hello again!</div>,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App; 
  