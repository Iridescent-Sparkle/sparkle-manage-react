import { Box, List } from '@mui/material'
import { useLocation } from 'react-router'
import { Fragment } from 'react/jsx-runtime'
import getMenuItems from './MenuItems.ts'
import NavGroup from './components/NavGroup/NavGroup.tsx'
import NavItem from './components/NavItem/index.tsx'
import { useUserStore } from 'src/store/user/index.ts'

function SidebarItems() {
  const { pathname } = useLocation()
  const pathDirect = pathname
  const userStore = useUserStore()

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {getMenuItems(userStore.userInfo.permissions?.map((item: any) => item.code), userStore.userInfo.isAdmin).map((item) => {
          if (item.subheader) {
            return (
              <Fragment key={item.subheader}>
                <NavGroup item={item} />
                {
                  item.children.map((child) => {
                    return <NavItem item={child} key={child.id} pathDirect={pathDirect} />
                  })
                }
              </Fragment>
            )
          }
          else {
            return (
              <NavItem item={item} key={item.id} pathDirect={pathDirect} />
            )
          }
        })}
      </List>
    </Box>
  )
}
export default SidebarItems
