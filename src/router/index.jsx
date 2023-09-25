import {
    createBrowserRouter,
} from "react-router-dom";
import Home from '@/pages/Home'
import BaseLayout from "@/components/layout/BaseLayout"
import ErrorPage from "@/pages/Error";
import Register from "@/pages/Register";
import Login from '@/pages/Login'
export const router = createBrowserRouter([
    {
      path: "/",
      element: <BaseLayout></BaseLayout>,
      errorElement: <ErrorPage />,
      children: [
        {
            path: '/',
            element: <Home/>
        },
        {
            path: '/profile',
            element: <h1>Profile User</h1>
        },{
          path: '/register',
          element: <Register/>
        },
        {
          path: '/login',
          element: <Login/>
        },
      ]
    },
]);