import { Box, Grid } from '@mui/material'
import PageContainer from 'src/components/Container/PageContainer'
import MonthlyEarnings from './components/MonthlyEarnings'
import ProductPerformance from './components/ProductPerformance'
import RecentTransactions from './components/RecentTransactions'
import SalesOverview from './components/SalesOverview'
import YearlyBreakup from './components/YearlyBreakup'

function Dashboard() {
  return (
    <PageContainer title="看板" description="看板页面">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard
