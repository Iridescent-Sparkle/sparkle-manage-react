import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
} from '@tabler/icons'

import { uniqueId } from 'lodash'

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
  {
    navlabel: true,
    subheader: 'Utilities',
  },
  {
    id: uniqueId(),
    title: 'Typography',
    icon: IconTypography,
    href: '/ui/typography',
  },
  {
    id: uniqueId(),
    title: 'Shadow',
    icon: IconCopy,
    href: '/ui/shadow',
  },
  {
    navlabel: true,
    subheader: 'Auth',
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
  {
    navlabel: true,
    subheader: 'Extra',
  },
  {
    id: uniqueId(),
    title: 'Icons',
    icon: IconMoodHappy,
    href: '/icons',
  },
  {
    id: uniqueId(),
    title: 'Sample Page',
    icon: IconAperture,
    href: '/sample-page',
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
]

export default Menuitems
