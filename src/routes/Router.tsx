import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
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

const filterRouter = (() => {
  return [
    {
      path: '/',
      element: <FullLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard" />, code: 'menu_dashboard' },
        { path: '/dashboard', exact: true, element: <Dashboard />, code: 'menu_dashboard' },
        { path: '/welfare-label', exact: true, element: <WelfareLabel />, code: 'menu_welfare_label' },
        { path: '/occupational-classification', exact: true, element: <OccupationalClassification />, code: 'menu_occupational_classification' },
        { path: '/menu-permission', exact: true, element: <MenuPermission />, code: 'menu_menu_permission' },
        { path: '/admin-user-list', exact: true, element: <AdminUserList />, code: 'menu_admin_user_list' },
        { path: '/user-list', exact: true, element: <UserList />, code: 'menu_user_list' },
        { path: '/role-list', exact: true, element: <RoleList />, code: 'menu_role_list' },
        { path: '/job-list', exact: true, element: <JobList />, code: 'menu_job_list' },
        { path: '/order-list', exact: true, element: <OrderList />, code: 'menu_order_list' },
        { path: '/resume-list', exact: true, element: <ResumeList />, code: 'menu_resume_list' },
        { path: '/trade-control', exact: true, element: <TradeControl />, code: 'menu_trade_control' },
        { path: '/goods-list', exact: true, element: <GoodsList />, code: 'menu_goods_list' },
        { path: '/company-auth', exact: true, element: <CompanyAuth />, code: 'menu_company_auth' },
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
})()
const Router = createBrowserRouter(filterRouter)

export default Router
