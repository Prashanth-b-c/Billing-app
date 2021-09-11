import { Table, TableContainer, TableRow, TableHead, TableCell, TableBody, IconButton, Paper, Container, TableFooter, makeStyles } from '@material-ui/core'
import React from 'react'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

const useStyle = makeStyles({
    tableHeaderFooter: {
        color: 'black',
        fontWeight: 600,
        fontSize: 14
    }
})

const ProductListTable = (props) => {
    const { items, handleChangeQuantity, handleRemoveLineItem } = props
    const classes = useStyle()

    const calculateTotal = (data) => {
        let total = 0
        data.forEach(ele => total = total + ele.subTotal)
        return total
    }

    return (
        <Container disableGutters>
            {
                items.length>0 && (
                    <TableContainer component={Paper}>
                        <Table size='small'>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tableHeaderFooter}>S.No</TableCell>
                                    <TableCell className={classes.tableHeaderFooter}>Product Name</TableCell>
                                    <TableCell className={classes.tableHeaderFooter}>Price</TableCell>
                                    <TableCell className={classes.tableHeaderFooter}>Quantity</TableCell>
                                    <TableCell className={classes.tableHeaderFooter}>Sub Total</TableCell>
                                    <TableCell className={classes.tableHeaderFooter}>Remove</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    items.map((product, index) => {
                                        return (
                                            <TableRow key={product._id}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{product.name}</TableCell>
                                                <TableCell>{product.price}</TableCell>
                                                <TableCell>
                                                    <IconButton 
                                                        size='small'
                                                        onClick={() => handleChangeQuantity(product, 'minus')}
                                                        disabled={product.quantity === 1 ? true : false}
                                                    >
                                                        <RemoveIcon />
                                                    </IconButton>
                                                        {` ${product.quantity} `}
                                                    <IconButton 
                                                        size='small'
                                                        onClick={() => handleChangeQuantity(product, 'add')}    
                                                    >
                                                        <AddIcon />
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell>{product.subTotal}</TableCell>
                                                <TableCell>
                                                    <IconButton
                                                        size='small'
                                                        onClick={() => handleRemoveLineItem(product)}
                                                    >
                                                        <DeleteForeverIcon />
                                                    </IconButton>
                                                </TableCell>
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
                                    <TableCell className={classes.tableHeaderFooter}>{calculateTotal(items)}</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                )
            }
        </Container>
    )
}

export default ProductListTable