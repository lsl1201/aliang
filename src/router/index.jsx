import { createBrowserRouter } from "react-router-dom";
import Layout from "@/Layout";
import Index from "../page/Index";
import Message from "../page/Message";
import Article from "../page/Article";
import ArticleContent from "../page/Article/ArticleContent";
import Project from "../page/Project";
import Ama from "../page/Ama";
import Loading from "../Layout/Loading";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "/article",
        element: <Article />,
      },
      {
        path: "/article/:id/:fileName",
        element: <ArticleContent />,
      },
      {
        path: "/project",
        element: <Project />,
      },
      {
        path: "/message",
        element: <Message />,
      },
      {
        path: "/ama",
        element: <Ama />,
      },
    ],
  },
  {
    path: "/loading",
    element: <Loading />,
  },
]);

export default router;
