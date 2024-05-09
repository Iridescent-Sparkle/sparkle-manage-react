import { NavLink } from 'react-router-dom'
import {
  List,
  ListItem,
  ListItemText,
  styled,
  useTheme,
} from '@mui/material'

function NavItem({ item, level, pathDirect, onClick }: { item: any, level: number, pathDirect: string, onClick: () => void }) {
  const theme = useTheme()

  const ListItemStyled = styled(ListItem)(() => ({
    'whiteSpace': 'nowrap',
    'marginBottom': '2px',
    'padding': '8px 10px',
    'borderRadius': '8px',
    'backgroundColor': level > 1 ? 'transparent !important' : 'inherit',
    'color':
      theme.palette.text.secondary,
    'paddingLeft': '10px',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.main,
    },
    '&.Mui-selected': {
      'color': 'white',
      'backgroundColor': theme.palette.primary.main,
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
      },
    },
  }))

  return (
    <List component="li" disablePadding key={item.id}>
      <ListItemStyled
        button
        component={item.external ? 'a' : NavLink}
        to={item.href}
        href={item.external ? item.href : ''}
        disabled={item.disabled}
        selected={pathDirect === item.href}
        target={item.external ? '_blank' : ''}
        onClick={onClick}
      >
        <ListItemText>
          <>{item.title}</>
        </ListItemText>
      </ListItemStyled>
    </List>
  )
}

export default NavItem
