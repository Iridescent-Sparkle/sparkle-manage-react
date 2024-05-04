import adminHttp from '../../request/admin'
import usePowerListStore from '../../stores/permission'

export interface MetaProps {
  keepAlive?: boolean
  requiresAuth?: boolean
  title: string
  key?: string
  icon?: string
  notMenu?: boolean
}

export interface RouteObject {
  code?: string
  children?: RouteObject[]
  element?: React.ReactNode
  index?: boolean
  path?: string
  meta?: MetaProps
  isLink?: string
}
export type FilterPermissionRouters = RouteObject[]

export async function filterPermissionRouters(routers: FilterPermissionRouters) {
  if (location.pathname === '/login')
    return [routers.find(item => item?.path === '/login')]

  const res = usePowerListStore.getState().permissionInfo || (await adminHttp.get('/uaa/v1/permission/current/user'))
  if (!usePowerListStore.getState().permissionInfo)
    usePowerListStore.setState({ permissionInfo: res })

  if (res.isRoot)
    return routers

  const codes = JSON.stringify(res.menuList)

    .match(/"code":"([a-zA-Z\_]+)"/g)
    .map(item => item.replace('"code":"', '').replace('"', ''))
  const loop = (router: FilterPermissionRouters) => {
    return router.filter((item) => {
      /** 没有code就直接展示 */
      if (!item.code)
        return true

      const includes = codes?.includes(item.code)
      if (includes && item?.children?.length)
        item.children = loop(item.children)

      return includes
    })
  }
  return loop(routers)
}
export function findFirstRoute(items: FilterPermissionRouters): string {
  const loop = (item: FilterPermissionRouters[0]): string => {
    if (item?.element && !item?.meta?.notMenu)
      return item.path

    if (!item?.children?.length)
      return ''

    for (const val of item.children) {
      const result = loop(val)
      if (result)
        return result
    }
    return ''
  }
  for (const item of items) {
    const result = loop(item)
    if (result)
      return result
  }
  return ''
}

export function findUrl(list: FilterPermissionRouters, pathname: string): boolean {
  if (!list?.length || pathname === '/')
    return false

  let result = true
  const loop = (list: FilterPermissionRouters) => {
    for (const item of list) {
      if (item.path !== '/') {
        const regexp = new RegExp(`^${item.path.replace('*', '.*')}/?$`)
        const hasHeader = regexp.test(pathname)
        if (hasHeader)
          result = false
      }
      loop(item?.children || [])
    }
  }
  loop(list)
  return result
}
