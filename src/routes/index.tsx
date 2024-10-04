import { MainLayout } from "../admin/layouts/MainLayout";
import { EmptyLayout } from "../admin/layouts/EmptyLayout";
import DefaultLayout from "../layout/DefaultLayout";
import { SignIn } from "../admin/pages/SignIn";
import { Home } from "../pages/Home";
import { AdminHome } from "../admin/pages/AdminHome";
import { ListCourse } from "../admin/pages/ListCourse";
import { AddCourse } from "../admin/pages/AddCourse";
import PrivateRoute from "./PivateRoute";
import { EditCourse } from "../admin/pages/EditCourse";
import { CourseDetail } from "../admin/pages/CourseDetail";

export const routes = [
  {
    path: "/",
    element: <DefaultLayout />,
    children: [{ path: "/", element: <Home /> }],
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "dashboard", element: <AdminHome /> },
      { path: "courses/add", element: <AddCourse /> },
      { path: "courses/all", element: <ListCourse /> },
      { path: "courses/edit/:id", element: <EditCourse /> },
      { path: "courses/detail/:id", element: <CourseDetail /> },
    ],
  },
  {
    path: "/admin/login",
    element: <EmptyLayout />,
    children: [{ path: "", element: <SignIn /> }],
  },
];
