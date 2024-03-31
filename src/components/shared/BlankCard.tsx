import { Card } from '@mui/material'

function BlankCard({ children, className }) {
  return (
    <Card
      sx={{ p: 0, position: 'relative' }}
      className={className}
      elevation={9}
      variant={undefined}
    >
      {children}
    </Card>
  )
}

export default BlankCard
