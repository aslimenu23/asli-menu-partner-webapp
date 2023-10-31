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
        index: true,
        element: <Restaurants />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/restaurant-details",
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
