import { RouteObject } from "react-router-dom";
import Login from "../containers/Login/Login";
import AppRoot from "../containers/AppRoot/AppRoot";
import Restaurants from "../containers/Restaurants/Restaurants";
import AddRestaurant from "../containers/AddRestaurant/AddRestaurant";
import Menu from "../containers/Menu/Menu";

const routes: RouteObject[] = [
  {
    path: "",
    element: <AppRoot />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/restaurants",
        element: <Restaurants />,
      },
      {
        path: "/add-restaurant",
        element: <AddRestaurant />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
    ],
  },
];

export default routes;
