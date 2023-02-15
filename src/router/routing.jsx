import Form from "../components/Form";
import Formiks from "../components/Formik";
import Login from "../components/Login";

export const Router = [
  {
    path: "auth",
    exact: true,
    // children: [{ path: "form", element: <Form /> }],
    children: [{ path: "form", element: <Formiks /> }],

  },
  {
    path: "/",
    exact: true,
    children: [{ path: "/", element: <Login /> }],
  },
];