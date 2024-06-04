import AboutPage from "../page/AboutPage/AboutPage";
import AdminPage from "../page/AdminPage/AdminPage";
import HomePage from "../page/HomePage/HomePage";
import NotFoundPage from "../page/NotFoundPage/NotFoundPage";
import ProfilePage from "../page/ProfilePage/ProfilePage";
import SignInPage from "../page/SignInPage/SignInPage";
import SignUpPage from "../page/SignUpPage/SignUpPage";
import ToDoPage from "../page/ToDoPage/ToDoPage";

export let routes = [
  {
    path: "/",
    page: HomePage,
    layout: "l1",
    isLogin: false,
  },
  {
    path: "/sign-in",
    page: SignInPage,
    // layout: "l1",
    isLogin: false,
  },
  {
    path: "/todo",
    page: ToDoPage,
    layout: "l1",
    isLogin: true,
  },
  {
    path: "/profile",
    page: ProfilePage,
    layout: "l1",
    isLogin: true,
  },
  {
    path: "/about-us",
    page: AboutPage,
    layout: "l1",
    isLogin: false,
  },
  {
    path: "/sign-up",
    page: SignUpPage,
    // layout: "l1",
  },

  // admin
  {
    path: "/admin",
    page: AdminPage,
    isAdmin: true,
    isLogin: true,
  },
  {
    path: "*",
    page: NotFoundPage,
    // layout: "l1",
  },
];
