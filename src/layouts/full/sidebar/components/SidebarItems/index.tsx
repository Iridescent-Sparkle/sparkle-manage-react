import { Box, List } from '@mui/material'
import { useLocation } from 'react-router'
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
          // {/********SubHeader**********/}
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />

            // {/********If Sub Menu**********/}
            /* eslint no-else-return: "off" */
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
