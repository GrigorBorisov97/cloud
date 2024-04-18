import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';

import Explorer from './pages/Explorer';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Explorer user={{username: 'grigor'}} />,
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
  