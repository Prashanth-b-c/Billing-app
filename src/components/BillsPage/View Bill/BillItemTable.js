import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, TableFooter, makeStyles } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'

const useStyle = makeStyles({
    tableHeaderFooter: {
        color: 'black',
        fontWeight: 600,
        fontSize: 14
    }
})

const BillItemtable = (props) => {
    const { items, total } = props
    const classes = useStyle()
    const products = useSelector(state => state.products)

    const getProductName = (id) => {
        const product = products.find(item => item._id === id)
        return product.name
    }

    return (
        <TableContainer component={Paper}>
            <Table size='small'>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableHeaderFooter}>S.No</TableCell>
                        <TableCell className={classes.tableHeaderFooter}>Product Name</TableCell>
                        <TableCell className={classes.tableHeaderFooter}>Price</TableCell>
                        <TableCell className={classes.tableHeaderFooter}>Quantity</TableCell>
                        <TableCell className={classes.tableHeaderFooter}>SubTotal</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        items.map((item, index) => {
                            return (
                                <TableRow key={item._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{getProductName(item.product)}</TableCell>
                                    <TableCell>{item.price}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>{item.subTotal}</TableCell>
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

export default BillItemtable