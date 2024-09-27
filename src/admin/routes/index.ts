// // routes/index.ts
// import { lazy } from "react";
// import { MainLayout } from "../../layouts/MainLayout";

// const AdminHome = lazy(() => import("../admin/pages/AdminHome"));
// const CourseForm = lazy(() => import("../admin/components/AddCourse"));
// const CourseList = lazy(() => import("../admin/components/ListCourses"));

// export const publicRoutes = [
//   {
//     path: "/admin",
//     element: <MainLayout />,
//     children: [
//       { path: "dashboard", element: <AdminHome /> },
//       { path: "courses", element: <CourseList /> },
//       { path: "courses/add", element: <CourseForm /> },
//       { path: "courses/all", element: <CourseList /> },
//     ],
//   },
// ];
