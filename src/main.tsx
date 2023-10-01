import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import BookCard from "./pages/BookCard.tsx";
import BookList from "./pages/BookList.tsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Favourites from "./pages/Favourites.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/book",
    element: <BookCard />,
  },
  {
    path: "/favourites",
    element: <Favourites />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
