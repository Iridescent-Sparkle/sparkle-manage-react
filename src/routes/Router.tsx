import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import Loadable from '../layouts/full/shared/loadable/Loadable'

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')))
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')))

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/Dashboard')))
const Error = Loadable(lazy(() => import('../views/Authentication/Error')))
const Register = Loadable(lazy(() => import('../views/Authentication/Register')))
const Login = Loadable(lazy(() => import('../views/Authentication/Login')))
const Label = Loadable(lazy(() => import('../views/WelfareLabel')))
const Occupational = Loadable(lazy(() => import('../views/OccupationalClassification')))
const Menu = Loadable(lazy(() => import('../views/MenuPermissions')))
const User = Loadable(lazy(() => import('../views/UserList')))
const Role = Loadable(lazy(() => import('../views/RoleList')))
const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/dashboard', exact: true, element: <Dashboard /> },
      { path: '/welfare-label', exact: true, element: <Label /> },
      { path: '/Occupational-classification', exact: true, element: <Occupational /> },
      { path: '/Menu-permissions', exact: true, element: <Menu /> },
      { path: '/User-list', exact: true, element: <User /> },
      { path: '/Role-list', exact: true, element: <Role /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
]

export default Router
