import { Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, makeStyles } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'

const useStyle = makeStyles({
    tableHeaderFooter: {
        color: 'black',
        fontWeight: 600
    }
})

const ViewOrderTable = (props) => {
    const { lineItems, total } = props
    const products = useSelector(state => state.products)
    const classes = useStyle()

    const getProductName = (id) => {
        const product = products.find(ele => ele._id === id)
        return product.name
    }

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableHeaderFooter}>S.No</TableCell>
                        <TableCell className={classes.tableHeaderFooter}>Product Name</TableCell>
                        <TableCell className={classes.tableHeaderFooter}>Price</TableCell>
                        <TableCell className={classes.tableHeaderFooter}>Quantity</TableCell>
                        <TableCell className={classes.tableHeaderFooter}>Sub Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        lineItems.map((list, index) => {
                            return (
                                <TableRow key={list._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{getProductName(list.product)}</TableCell>
                                    <TableCell>{list.price}</TableCell>
                                    <TableCell>{list.quantity}</TableCell>
                                    <TableCell>{list.subTotal}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell className={classes.tableHeaderFooter}>Total Amount</TableCell>
                        <TableCell className={classes.tableHeaderFooter}>{total}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )
}

export default ViewOrderTable