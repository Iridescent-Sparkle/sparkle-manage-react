import {
  IconAperture,
  IconLayoutDashboard,
  IconLogin,
  IconUserPlus
} from '@tabler/icons'

import uniqueId from 'lodash-es/uniqueId'

const Menuitems = [
  {
    navlabel: true,
    subheader: '首页',
  },
  {
    id: uniqueId(),
    title: '看板',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
  {
    navlabel: true,
    subheader: '权限管理',
  },
  {
    id: uniqueId(),
    title: '菜单权限',
    icon: IconAperture,
    href: '/Menu-permissions',
  },
  {
    id: uniqueId(),
    title: '用户列表',
    icon: IconAperture,
    href: '/User-list',
  },
  {
    id: uniqueId(),
    title: '角色列表',
    icon: IconAperture,
    href: '/Role-list',
  },
  {
    navlabel: true,
    subheader: '标签管理',
  },
  {
    id: uniqueId(),
    title: '福利标签',
    icon: IconAperture,
    href: '/welfare-label',
  },
  {
    id: uniqueId(),
    title: '职业分类',
    icon: IconAperture,
    href: '/Occupational-classification',
  },
  {
    navlabel: true,
    subheader: '帐户',
  },
  {
    id: uniqueId(),
    title: 'Login',
    icon: IconLogin,
    href: '/auth/login',
  },
  {
    id: uniqueId(),
    title: 'Register',
    icon: IconUserPlus,
    href: '/auth/register',
  },
]

export default Menuitems
