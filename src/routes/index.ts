import AdminHome from "../admin/pages/AdminHome";
import { SignIn } from "../admin/pages/SignIn";
import Home from "../pages/Home";


export const publicRoutes = [
    { path: '/', component: Home },
    { path: '/admin', component: AdminHome },
    { path: '/admin/login', component: SignIn }
]