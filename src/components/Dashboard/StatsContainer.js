import { Grid, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import StatsItem from './StatsItem'

const useStyle = makeStyles({
    statsHeader: {
        fontWeight: 700
    }
})

const StatsContainer = (props) => {
    const products = useSelector(state => state.products)
    const customers = useSelector(state => state.customers)
    const bills = useSelector(state => state.bills)
    const classes = useStyle()


    return(
        <>
            <Typography variant='h6' className={classes.statsHeader}>Overall Stats</Typography>
            <Grid container spacing={6}>
                    <StatsItem statTitle={'Total Customers'} statNumber={customers.length} />
                    <StatsItem statTitle={'Total Products'} statNumber={products.length} />
                    <StatsItem statTitle={'Total Orders'} statNumber={bills.length} />
            </Grid>
        </>
    )
}

export default StatsContainer