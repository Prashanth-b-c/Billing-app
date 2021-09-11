import React, { useEffect, useState } from 'react'
import { Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { asyncCustomerDetail } from '../../../action/customerAction'

const useStyle = makeStyles({
    custDetail: {
        padding: '16px 0'
    }
})

const CustomerStats = (props) => {
    const { id, customerBills } = props
    const classes = useStyle()
    const [ customerDetail, setCustomerDetail ] = useState({})

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(asyncCustomerDetail(id, handleCustomerDetail))
    }, [dispatch, id])

    const handleCustomerDetail = (data) => {
        setCustomerDetail(data)
    }

    const calculateTotal = (data) => {
        let total = 0
        data.forEach(bill => {
            total = total + bill.total
        })
        return total
    }

    return (
        <Grid container spacing={2}>
            <Grid item lg={4}>
                <Paper className={classes.custDetail}>
                    <Container>
                        <Typography variant='body1'><strong>Name: </strong>{customerDetail.name}</Typography>
                        <Typography variant='body1'><strong>Email: </strong>{customerDetail.email}</Typography>
                        <Typography variant='body1'><strong>Mobile: </strong>{customerDetail.mobile}</Typography>
                    </Container>
                </Paper>
            </Grid>
            <Grid item lg={4}>
                <Paper>
                    <Typography variant='h6' align='center'>Total Orders</Typography>
                    <Typography variant='h2' align='center'>{customerBills.length}</Typography>
                </Paper>
            </Grid>
            <Grid item lg={4}>
                <Paper>
                    <Typography variant='h6' align='center'>Total Amount of Purchase</Typography>
                    <Typography variant='h2' align='center'>{calculateTotal(customerBills)}</Typography>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default CustomerStats