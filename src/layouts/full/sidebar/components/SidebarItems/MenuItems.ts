import uniqueId from 'lodash-es/uniqueId'

function getMenuItems(permissions: string | string[], isAdmin: boolean) {
  let menuItems = [
    // {
    //   navlabel: true,
    //   subheader: '首页',
    //   children: [
    //     {
    //       id: uniqueId(),
    //       title: '看板',
    //       href: '/dashboard',
    //       code: 'menu_dashboard',
    //     },
    //   ],
    // },
    {
      navlabel: true,
      subheader: '权限管理',
      children: [
        {
          id: uniqueId(),
          title: '用户列表',

          href: '/admin-user-list',
          code: 'menu_admin_user_list',
        },
        {
          id: uniqueId(),
          title: '角色列表',

          href: '/role-list',
          code: 'menu_role_list',
        },
        {
          id: uniqueId(),
          title: '菜单权限',

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

          href: '/welfare-label',
          code: 'menu_welfare_label',
        },
        {
          id: uniqueId(),
          title: '职业分类',

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

          href: '/user-list',
          code: 'menu_user_list',
        },
        {
          id: uniqueId(),
          title: '职位列表',

          href: '/job-list',
          code: 'menu_job_list',
        },
        {
          id: uniqueId(),
          title: '简历列表',

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

          href: '/trade-control',
          code: 'menu_trade_control',
        },
        {
          id: uniqueId(),
          title: '订单列表',

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

          href: '/goods-list',
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

          href: '/company-auth',
          code: 'menu_company_auth',
        },
      ],
    },

  ]

  if (isAdmin)
    return menuItems

  menuItems = menuItems.filter((item) => {
    if (item.children) {
      item.children = item.children.filter((child) => {
        if (permissions?.includes(child.code))
          return true

        return false
      })
    }
    if (!item.children.length)
      return false

    return true
  })
  return menuItems
}

export default getMenuItems
