import {
  IconAperture,
  IconLayoutDashboard,
} from '@tabler/icons'

import uniqueId from 'lodash-es/uniqueId'


const getMenuItems = (permissions: string | string[]) => {
  let menuItems = [
    {
      navlabel: true,
      subheader: '首页',
      children: [
        {
          id: uniqueId(),
          title: '看板',
          icon: IconLayoutDashboard,
          href: '/dashboard',
          code: 'menu_dashboard',
        },
      ],
    },
    {
      navlabel: true,
      subheader: '权限管理',
      children: [
        {
          id: uniqueId(),
          title: '用户列表',
          icon: IconAperture,
          href: '/admin-user-list',
          code: 'menu_admin_user_list',
        },
        {
          id: uniqueId(),
          title: '角色列表',
          icon: IconAperture,
          href: '/role-list',
          code: 'menu_role_list',
        },
        {
          id: uniqueId(),
          title: '菜单权限',
          icon: IconAperture,
          href: '/menu-permission',
          code: 'menu_menu_permission',
        },
      ],
    },
    {
      navlabel: true,
      subheader: '内容管理',
      children: [
        {
          id: uniqueId(),
          title: '福利标签',
          icon: IconAperture,
          href: '/welfare-label',
          code: 'menu_welfare_label',
        },
        {
          id: uniqueId(),
          title: '职业分类',
          icon: IconAperture,
          href: '/occupational-classification',
          code: 'menu_occupational_classification',
        },
      ],
    },

    {
      navlabel: true,
      subheader: '用户运营',
      children: [
        {
          id: uniqueId(),
          title: '用户列表',
          icon: IconAperture,
          href: '/user-list',
          code: 'menu_user_list',
        },
        {
          id: uniqueId(),
          title: '职位列表',
          icon: IconAperture,
          href: '/job-list',
          code: 'menu_job_list',
        },
        {
          id: uniqueId(),
          title: '简历列表',
          icon: IconAperture,
          href: '/resume-list',
          code: 'menu_resume_list',
        },
      ],
    },
    {
      navlabel: true,
      subheader: '交易中心',
      children: [
        {
          id: uniqueId(),
          title: '交易控制',
          icon: IconAperture,
          href: '/trade-control',
          code: 'menu_trade_control',
        },
        {
          id: uniqueId(),
          title: '订单列表',
          icon: IconAperture,
          href: '/order-list',
          code: 'menu_order_list',
        },
      ],
    },
    {
      navlabel: true,
      subheader: '商品中心',
      children: [
        {
          id: uniqueId(),
          title: '商品列表',
          icon: IconAperture,
          href: '/order-list',
          code: 'menu_goods_list',
        },
      ],
    },
    {
      navlabel: true,
      subheader: '审核中心',
      children: [
        {
          id: uniqueId(),
          title: '企业认证',
          icon: IconAperture,
          href: '/company-auth',
          code: 'menu_company_auth',
        },
      ],
    },

  ]

  menuItems = menuItems.filter(item => {
    if (item.children) {
      item.children = item.children.filter(child => {
        if (permissions?.includes(child.code)) {
          return true
        }
        return false
      })
    }
    if (!item.children.length) {
      return false
    }
    return true
  })
  return menuItems
}

export default getMenuItems
