import { createBrowserRouter } from "react-router-dom"
import { App } from "../../App"
import { Users } from "../../features/users/ui/Users"
import { Main } from "../main/Main"
import { Profile } from "../../features/profile/ui/Profile"
import {Login} from "../../features/login/Login";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>error 404</div>,
    children: [
      {
        path: "/",
        element: <Main />,
        children: [
          {
            path: "/",
            element: <Profile />,
          },
          {
            path: "/users",
            element: <Users />,
          },
          {
            path: "/users/profile/:userId",
            element: <Profile />,
          },
          {
            path: "*",
            element: <div>Error 404</div>,
          },
        ],
      },
    ],
  },
])
