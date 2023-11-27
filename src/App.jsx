import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import LoginPage from './pages/login/index.jsx';
import Header from "./components/Header/index.jsx";
import Footer from "./components/Footer/index.jsx";
import Home from "./components/Home/index.jsx";
import RegisterPage from "./pages/register/index.jsx";

const Layout = () => {
  return (
    <div className="layout-app">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}


export default function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <div>404 Not Found</div>,
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "register",
      element: <RegisterPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}