import React from 'react'
import { withRouter } from 'react-router-dom'
import { Paper, Typography, makeStyles, Divider, Button, Container } from '@material-ui/core'
import CustomerSuggestion from './CustomerSuggestion'
import { useDispatch } from 'react-redux'
import { asyncAddBill } from '../../../action/billsAction'

const useStyle = makeStyles({
    summaryContainer: {
        height: '45vh'
    }, 
    title: {
        fontWeight: '700',
        textAlign: 'center'
    }
})

const SummaryOfBill = (props) => {
    const classes = useStyle()
    const { handleCustomerInfo, lineItems, customerInfo } = props
    const dispatch = useDispatch()

    const handleGenerateBill = () => {
        const items = []
        lineItems.forEach(item => {
            items.push({product: item._id, quantity: item.quantity})
        })
        const billData = {
            date: new Date(),
            customer: customerInfo._id,
            lineItems: items
        }
        dispatch(asyncAddBill(billData, props.history))
    }

    return (
        <Paper elevation={3} className={classes.summaryContainer}>
            <Typography className={classes.title} variant='h5'>Select Customer</Typography>
            <Divider />
            <Container>
                <CustomerSuggestion handleCustomerInfo={handleCustomerInfo} />
            </Container>
            <Container>
                <Button 
                    variant='contained' 
                    color='primary' 
                    fullWidth
                    onClick={handleGenerateBill}
                >
                    Generate Bill
                </Button>
            </Container>
        </Paper>
    )
}

export default withRouter(SummaryOfBill)