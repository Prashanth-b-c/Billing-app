import { Container, Box, Typography, makeStyles, Grid, TextField, Divider } from '@material-ui/core'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import BillsTable from './BillsTable'
import AddBill from './Generate New Bill/AddBill'

const useStyle = makeStyles({
    title:{
        fontWeight: '700'
    },
    container: {
        width: '90vw',
        padding: '2vh 2vw',
        marginLeft: '50px',
    },
    titleContainer:{
        width: '100%'
    },
    searchField:{
        width: '35%'
    },
    summarySection:{
        marginTop: '60px'
    },
    billTableSection: {
        width: '80vw'
    },
    divider:{
        width: '85vw'
    },

})

const BillsPage = (props) => {
    const bills = useSelector(state => state.bills)
    
    const classes = useStyle()
    const [ search, setSearch ] = useState()
    const [ allBills, setAllBills ] = useState(bills)

    const handleSearch = (e) => {
        setSearch(e.target.value)
        const filteredBill = searchBill(e.target.value)
        setAllBills(filteredBill)
    }

    // const getCustomerName = (id) => {
    //     if(customers.length > 0){
    //         const getCustomer = customers.find(cust => cust._id === id)
    //         return getCustomer.name
    //     }
    // }

    const searchBill = (id) => {
        if(id.length > 0) {
            return bills.filter(bill => bill._id.includes(id))
        } else {
            return bills
        }
    }

    const resetSearch = () => {
        setSearch('')
    }

    return (
        <Container className={classes.container}>
            <Container>
                <AddBill/>
                <Divider className={classes.divider} />
            </Container>
            <Grid container spacing={2}>
                <Grid className={classes.billTableSection} item lg={9} md={9} sm={12} xs={12}>
                    <Box 
                        disableGutters
                        display='flex'
                        flexDirection='row'
                        justifyContent='space-between'
                    >
                        <Typography 
                            className={classes.title} 
                            variant='h3'
                        >
                            Bills
                        </Typography>
                        <TextField 
                            className={classes.searchField}
                            variant='outlined'
                            label='search by order id'
                            margin='dense'
                            value={search}
                            onChange={handleSearch}
                        />
                    </Box>
                    { bills.length > 0 && <BillsTable bills={allBills} resetSearch={resetSearch} /> }
                   
                </Grid>
            </Grid>
        </Container>    
    )
}

export default BillsPage 