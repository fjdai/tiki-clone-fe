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
import { useEffect } from "react";
import { callFetchAccount } from "./services/apiAuth";
import { useDispatch, useSelector } from "react-redux";
import { doGetAccountAction } from "./redux/account/accountSlice.jsx";
import NotFound from "./components/NotFound/index.jsx";
import Loading from "./components/Loading/index.jsx";
import ContactPage from "./pages/contact/index.jsx";
import BookPage from "./pages/book/index.jsx";
import AdminPage from "./pages/admin/index.jsx";
import ProtectedRoute from "./components/ProtectedRoute/index.jsx";
import LayoutAdmin from "./components/Admin/LayoutAdmin.jsx";
import Box from "@mui/material/Box";
import ManageUsers from "./pages/admin/manageUsers/index.jsx";

const Layout = () => {
  return (
    <div className="layout-app">
      <Box display={"flex"} flexDirection={"column"} overflow={"hidden"}>
        <Header />
        <Outlet />
        <Footer />
      </Box>
    </div>
  )
}


export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.account.isLoading);

  const getAccount = async () => {
    if (
      window.location.pathname === "/login"
      || window.location.pathname === "/register"
    )
      return;


    const res = await callFetchAccount();
    if (res && res.data) {
      dispatch(doGetAccountAction(res.data))
    }
  }

  useEffect(() => {
    getAccount()
  }, [])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "contact",
          element: <ContactPage />,
        },
        {
          path: "book",
          element: <BookPage />,
        },
      ],
    },

    {
      path: "/admin",
      element: <LayoutAdmin />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element:
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
        },
        {
          path: "user",
          element:
            <ProtectedRoute>
              <ManageUsers />
            </ProtectedRoute>
          ,
        },
        {
          path: "book",
          element:
            <ProtectedRoute>
              <BookPage />
            </ProtectedRoute>
          ,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
  ]);

  return (
    <>
      {
        isLoading === false
          || window.location.pathname === '/login'
          || window.location.pathname === '/register'
          || window.location.pathname === '/'
          ?
          <RouterProvider router={router} />
          :
          <Loading />
      }
    </>
  )
}