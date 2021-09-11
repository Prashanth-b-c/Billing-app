import React, { useState } from 'react'
import { makeStyles, Container, Typography, Box, Grid } from '@material-ui/core'
import ProductSuggestion from './ProductSuggestion'
import ProductListTable from './ProductListTable'
import SummaryOfBill from './SummaryOfBill'

const useStyle = makeStyles({
    title:{
        fontWeight: '700'
    },
    container: {
        width: '90vw',
        padding: '2vh 1vw'
    },
    gridContainer: {
        height: '53vh'
    }
})

const AddBill = (props) => {
    const classes = useStyle()
    const [ lineItems, setLineItems ] = useState([])
    const [ customerInfo, setCustomerInfo ] = useState([])

    // functions related to lineitems
    const handleAddLineItem = (data) => {
        const newList = [...lineItems, data]
        setLineItems(newList)
    }

    const handleRemoveLineItem = (data) => {
        const newList = lineItems.filter(product => product._id !== data._id)
        setLineItems(newList)
    }

    const handleChangeQuantity = (data, type) => {
        if(type === 'add') {
            const newQuantityPlus = {...data, quantity: data.quantity + 1}
            newQuantityPlus.subTotal = newQuantityPlus.price * newQuantityPlus.quantity
            console.log(newQuantityPlus)
            const newList = lineItems.map(product => {
                if(product._id === newQuantityPlus._id) {
                    return newQuantityPlus
                } else {
                    return product
                }
            })
            setLineItems(newList)
        } else if(type === 'minus') {
            const newQuantityMinus = {...data, quantity: data.quantity - 1}
            newQuantityMinus.subTotal = newQuantityMinus.price * newQuantityMinus.quantity
            console.log(newQuantityMinus)
            const newList = lineItems.map(product => {
                if(product._id === newQuantityMinus._id) {
                    return newQuantityMinus
                } else {
                    return product
                }
            })
            setLineItems(newList)
        } 
    }

    // function related to customerInfo
    const handleCustomerInfo = (value) => {
        setCustomerInfo(value)
    }

    return (
        <Container className={classes.container}>
            <Box display='flex' flexDirection='row' justifyContent='space-between'>
                <Typography 
                    className={classes.title} 
                    variant='h3'
                >
                    New Bill
                </Typography>
            </Box>
            <Grid className={classes.gridContainer} container spacing={2}>
                <Grid item lg={9} md={9} sm={12}>
                    <ProductSuggestion handleAddLineItem={handleAddLineItem} />
                    <ProductListTable 
                        items={lineItems} 
                        handleChangeQuantity={handleChangeQuantity}
                        handleRemoveLineItem={handleRemoveLineItem}
                    />
                </Grid>
                <Grid item lg={3} md={3} sm={12}>
                    <SummaryOfBill 
                        handleCustomerInfo={handleCustomerInfo} 
                        lineItems={lineItems} 
                        customerInfo={customerInfo} 
                    />
                </Grid>
            </Grid>
        </Container>
    )
}

export default AddBill