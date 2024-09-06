import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "../views/Login";
import BaseLayout from "../views/BaseLayout";
import Homepage from "../views/Homepage";
import DetailPage from "../views/DetailPage";
import UploadImage from "../views/UploadImage";
import BookmarkPage from "../views/BookmarkPage";

// const url = `http://localhost:3000`; /*<<<<< ini url localhost*/
const url = `https://deploy.athiflanang.site`;

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login url={url} />,
    loader: () => {
      if (localStorage.access_token) {
        Toastify({
          text: "You have already logged in",
          duration: 2000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "left",
          stopOnFocus: true,
          style: {
            background: "#EF4C54",
            color: "#17202A",
            boxShadow: "0 5px 10px black",
            fontWeight: "bold",
          },
        }).showToast();
        return redirect("/");
      }
      return null;
    },
  },
  {
    element: <BaseLayout />,
    loader: () => {
      if (!localStorage.access_token) {
        Toastify({
          text: "Please sign in first",
          duration: 2000,
          newWindow: true,
          close: true,
          gravity: "bottom",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "#EF4C54",
            color: "#17202A",
            boxShadow: "0 5px 10px black",
            fontWeight: "bold",
          },
        }).showToast();
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <Homepage url={url} />,
      },
      {
        path: "/detail/:id",
        element: <DetailPage url={url} />,
      },
      {
        path: "/bookmark/detail/:id",
        element: <DetailPage url={url} />,
      },
      {
        path: "/uploadImg/:id",
        element: <UploadImage url={url} />,
      },
      {
        path: "/bookmark",
        element: <BookmarkPage url={url} />,
      },
    ],
  },
]);

export default router;
