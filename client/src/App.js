import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Landing, Jobs, Error, Layout } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Landing /> },
      { path: "jobs", element: <Jobs /> },

    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
