import { Typography, Container, Box } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import React from 'react'
import ViewOrderTable from './ViewOrderTable'
import moment from 'moment'

const Accordion = withStyles({
    root: {
      border: '1px solid rgba(0, 0, 0, .125)',
      boxShadow: 'none',
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&:before': {
        display: 'none',
      },
      '&$expanded': {
        margin: 'auto',
      },
    },
    expanded: {},
  })(MuiAccordion);
  
const AccordionSummary = withStyles({
    root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
        minHeight: 56,
    },
    },
    content: {
    '&$expanded': {
        margin: '12px 0',
    },
    },
    expanded: {},
})(MuiAccordionSummary);
  
const AccordionDetails = withStyles((theme) => ({
    root: {
    padding: theme.spacing(2)
    },
}))(MuiAccordionDetails);

const CustomerOrders = (props) => {
    const { customerBills } = props

    return (
        <>
            <Typography variant='h5' align='center'>List of Orders - {customerBills.length}</Typography>
            {
                customerBills.map(bill => {
                    return (
                        <Accordion>
                            <AccordionSummary>
                                <Box width='100%' display='flex' flexDirection='row' justifyContent='space-between' >
                                    <Typography variant='h6'>{moment(bill.date).format('DD/MM/YYYY, hh:mm A')}</Typography>
                                    <Typography variant='h6'>Order ID - {bill._id}</Typography>
                                    <Typography variant='h6'>Total - Rs.{bill.total}</Typography>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Container>
                                    <ViewOrderTable lineItems={bill.lineItems} total={bill.total} />
                                </Container>
                            </AccordionDetails>
                        </Accordion>
                    )
                })
            }
        </>
    )
}

export default CustomerOrders