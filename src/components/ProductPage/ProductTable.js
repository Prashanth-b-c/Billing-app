import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyle = makeStyles({
    table: {
        maxHeight: '380px'
    },
    nameHeader: {
        width: '35%'
    },
    tableBtns:{
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'space-evenly'
    },
    tableHeader: {
        backgroundColor: 'black',
        color: 'white'
    },
    headerName: {
        color:'white'
    }
})

const ProductTable = (props) => {
    const { handleDeleteProduct, handleViewProduct, handleUpdateProd, products, resetSearch } = props
    const classes = useStyle()

    return (
        <TableContainer className={classes.table} component={Paper}>
            <Table stickyHeader size='small'>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableHeader} align='center'>ID</TableCell>
                        <TableCell className={`${classes.nameHeader} ${classes.tableHeader}`} align='center'>Product Name</TableCell>
                        <TableCell className={classes.tableHeader} align='center'>Price</TableCell>
                        <TableCell className={classes.tableHeader} align='center'>View</TableCell>
                        <TableCell className={classes.tableHeader} align='center'>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        products.map((prod,index) => {
                            return (
                                <TableRow hover key={prod._id}>
                                    <TableCell align='center'> {index + 1} </TableCell>
                                    <TableCell align='center'> {prod.name} </TableCell>
                                    <TableCell align='center'> {prod.price} </TableCell>
                                    <TableCell align='center'> 
                                        <Button 
                                            variant='contained'
                                            color='primary' 
                                            onClick={() => handleViewProduct(prod._id)}   
                                        >
                                            View
                                        </Button>
                                    </TableCell>
                                    <TableCell className={classes.tableBtns}> 
                                        <Button 
                                            variant='contained'
                                            color='primary'
                                            onClick={() => {
                                                handleUpdateProd(prod)
                                                resetSearch()
                                            }}
                                        >
                                            Update
                                        </Button>
                                        <Button 
                                            variant='contained'
                                            color='secondary'   
                                            onClick={() => {
                                                handleDeleteProduct(prod._id)
                                                resetSearch()
                                            }}
                                        >
                                            remove
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ProductTable