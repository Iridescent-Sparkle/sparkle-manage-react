import { createBrowserHistory } from 'history';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';

const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')))
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')))

const Dashboard = Loadable(lazy(() => import('../views/Dashboard')))
const Error = Loadable(lazy(() => import('../views/Authentication/Error')))
const Register = Loadable(lazy(() => import('../views/Authentication/Register')))
const Login = Loadable(lazy(() => import('../views/Authentication/Login')))
const WelfareLabel = Loadable(lazy(() => import('../views/WelfareLabel')))
const OccupationalClassification = Loadable(lazy(() => import('../views/OccupationalClassification')))
const MenuPermission = Loadable(lazy(() => import('../views/MenuPermission')))
const AdminUserList = Loadable(lazy(() => import('../views/AdminUserList')))
const RoleList = Loadable(lazy(() => import('../views/RoleList')))
const JobList = Loadable(lazy(() => import('../views/JobList')))
const OrderList = Loadable(lazy(() => import('../views/OrderList')))
const ResumeList = Loadable(lazy(() => import('../views/ResumeList')))
const TradeControl = Loadable(lazy(() => import('../views/TradeControl')))
const UserList = Loadable(lazy(() => import('../views/UserList')))
const GoodsList = Loadable(lazy(() => import('../views/GoodsList')))
const CompanyAuth = Loadable(lazy(() => import('../views/CompanyAuth')))

export const getRoutes = (permissions: string[], isAdmin: boolean) => {
  const routes = [
    {
      path: '/',
      element: <FullLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard" />, code: 'menu_dashboard' },
        { path: '/dashboard', element: <Dashboard />, code: 'menu_dashboard' },
        { path: '/welfare-label', element: <WelfareLabel />, code: 'menu_welfare_label' },
        { path: '/occupational-classification', element: <OccupationalClassification />, code: 'menu_occupational_classification' },
        { path: '/menu-permission', element: <MenuPermission />, code: 'menu_menu_permission' },
        { path: '/admin-user-list', element: <AdminUserList />, code: 'menu_admin_user_list' },
        { path: '/user-list', element: <UserList />, code: 'menu_user_list' },
        { path: '/role-list', element: <RoleList />, code: 'menu_role_list' },
        { path: '/job-list', element: <JobList />, code: 'menu_job_list' },
        { path: '/order-list', element: <OrderList />, code: 'menu_order_list' },
        { path: '/resume-list', element: <ResumeList />, code: 'menu_resume_list' },
        { path: '/trade-control', element: <TradeControl />, code: 'menu_trade_control' },
        { path: '/goods-list', element: <GoodsList />, code: 'menu_goods_list' },
        { path: '/company-auth', element: <CompanyAuth />, code: 'menu_company_auth' },
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
  
  if (isAdmin) {
    return routes
  }

  routes[0].children = routes[0].children.filter(item => permissions?.includes(item.code!))
  return routes
}


export const Router = createBrowserHistory({
  window,
})
