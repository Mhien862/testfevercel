import { createBrowserRouter } from "react-router-dom";
import Home from "./home";
import LayOut from "./components/LayOut";
import Login from "./formlogins/Login";
import ForgotPassword from "./formlogins/ForgotPassword";
import ResetPassword from "./formlogins/ResetPassword";
import LayoutLogin from "./formlogins/LayoutLogin";
import Profile from "./profile/Profile";

import User from "./ListUser/User";
import CreateUser from "./ListUser/CreateUser";
import Edituser from "./ListUser/EditUser";
import Event from "./event/event";
import Contribute from "./contribute/contribute";
import ListConTribute from "./contribute/listcontribute";
import DetailEvent from "./event/detailEvent";
import PostEvent from "./event/postEvent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayOut />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "user/edit/:id",
        element: <Edituser />,
      },
      {
        path: "/createuser",
        element: <CreateUser />,
      },
      {
        path: "/edituser:_id",
        element: <Edituser />,
      },
      {
        path: "/event",
        element: <Event />,
      },
      {
        path: "/contribute/:id",
        element: <Contribute />,
      },
      {
        path: "/contribute",
        element: <Contribute />,
      },
      {
        path: "/listcontribute",
        element: <ListConTribute />,
      },
      {
        path: "/listcontribute",
        element: <ListConTribute />,
      },
      {
        path: "/event/detail/:id",
        element: <DetailEvent />,
      },
      {
        path: "/event/post/:id",
        element: <PostEvent />,
      },
    ],
  },
  {
    element: <LayoutLogin />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgot",
        element: <ForgotPassword />,
      },
      {
        path: "/reset",
        element: <ResetPassword />,
      },
      {
        path: "/user",
        element: <User />,
      },
    ],
  },
]);

export default router;
