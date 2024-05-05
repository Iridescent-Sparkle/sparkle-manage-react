import { Box, List } from '@mui/material'
import { useLocation } from 'react-router'
import { Fragment } from 'react/jsx-runtime'
import Menuitems from './MenuItems.ts'
import NavGroup from './components/NavGroup/NavGroup.tsx'
import NavItem from './components/NavItem/index.tsx'

function SidebarItems() {
  const { pathname } = useLocation()
  const pathDirect = pathname

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {Menuitems.map((item) => {
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
