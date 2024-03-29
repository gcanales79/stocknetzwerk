//Layout
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutBasic from "../layouts/LayoutBasic"

//Admin pages
import AdminHome from "../pages/Admin";
import AdminSignIn from "../pages/Admin/SignIn/SignIn";
import AdminUsers from "../pages/Admin/Users";
import AdminMenuWeb from "../pages/Admin/MenuWeb";
import AdminCourses from "../pages/Admin/Courses"
import AdminBlog from "../pages/Admin/Blog";
import AdminTweet from "../pages/Admin/Tweet";
import AdminTracking from "../pages/Admin/Tracking";
import AdminCall from "../pages/Admin/Call";
import AdminBirthday from "../pages/Admin/Birthday";

//Pages
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Courses from "../pages/Courses";
import Blog from "../pages/Blog";
import Libros from "../pages/Libros";

//Other
import Error404 from "../pages/Error404"

const routes=[
    //Esta es la ruta del panel de administrador
    {
        path:"/admin",
        component:LayoutAdmin,
        //Es false para que sea el layout basico que cargue
        exact:false,
        routes:[
            {
                path:"/admin",
                component:AdminHome,
                exact:true
            },
            {
                path:"/admin/login",
                component:AdminSignIn,
                exact:true
            },
            {
                path:"/admin/users",
                component:AdminUsers,
                exact:true
            },
            {
                path:"/admin/menu",
                component:AdminMenuWeb,
                exact:true
            },
            {
                path:"/admin/courses",
                component:AdminCourses,
                exact:true
            },
            {
                path:"/admin/blog",
                component:AdminBlog,
                exact:true
            },
            {
                path:"/admin/tweet",
                component:AdminTweet,
                exact:true
            },
            {
                path:"/admin/tracking",
                component:AdminTracking,
                exact:true
            },
            {
                path:"/admin/calls",
                component:AdminCall,
                exact:true
            },
            {
                path:"/admin/birthday",
                component:AdminBirthday,
                exact:true
            },
            {
                component:Error404
            }
        ]
    },
    //Esta es la configuracion de las paginas normales
    {
        path:"/",
        component:LayoutBasic,
        //Es false para que sea el layout basico que cargue
        exact:false,
        routes:[
            {
                path:"/",
                component:Home,
                exact:true
            },
            {
                path:"/contact",
                component:Contact,
                exact:true
            },
            {
                path:"/courses",
                component:Courses,
                exact:true
            },
            {
                path:"/blog",
                component:Blog,
                exact:true
            },
            {
                path:"/blog/:url",
                component:Blog,
                exact:true
            },
            {
                path:"/libros",
                component:Libros,
                exact:true
            },
            {
                component:Error404
            }
        ]
    }
]

export default routes;