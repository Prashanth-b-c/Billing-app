import { Grid } from '@material-ui/core'
import React from 'react'
import BarChart from './BarChart'


const StatsChart = (props) => {

    return (
        <>
            <Grid>
                <Grid item lg={6}>
                    <BarChart />
                </Grid>
            </Grid>
        </>
    )
}

export default StatsChart