import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import Loadable from '../layouts/full/shared/loadable/Loadable'

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')))
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')))

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')))
const Error = Loadable(lazy(() => import('../views/authentication/Error')))
const Register = Loadable(lazy(() => import('../views/authentication/Register')))
const Login = Loadable(lazy(() => import('../views/authentication/Login')))
const Label = Loadable(lazy(() => import('../views/welfare-label/welfareLabel')))
const Occupational = Loadable(lazy(() => import('../views/Occupational-classification/OccupationalClassification')))
const Menu = Loadable(lazy(() => import('../views/Menu-permissions/MenuPermissions')))
const User = Loadable(lazy(() => import('../views/User-list/userList')))
const Role = Loadable(lazy(() => import('../views/Role-list/roleList')))
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
