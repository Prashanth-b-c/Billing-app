import { Button } from '@material-ui/core'
import moment from 'moment'
import React from 'react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import GetAppIcon from '@material-ui/icons/GetApp'
import { useSelector } from 'react-redux'

const PrintBill = (props) => {
    const { customer, bill, id, items } = props
    const products = useSelector(state => state.products)
    
    const getProductName = (id) => {
        const product = products.find(item => item._id === id)
        return product.name
    }
    
    const body = items.map((item, i) => {
        return {...item, index: i+1, productName: getProductName(item.product) }
    })

    const generatePdf = () => {
        const doc = new jsPDF()
        doc.text('Bill Invoice', 92, 13)
        doc.text(`Customer Name - ${customer.name}`, 15, 25)
        doc.text(`Date & time - ${moment(bill.createdAt).format('DD/MM/YYYY, hh:mm A')}`, 15, 35)
        doc.text(`Total Amount - Rs.${bill.total}`, 15, 45)
        autoTable(doc, {
        margin: { top:55 },
        columns: [
            {header:'S.No', dataKey:'index'}, 
            {header:'Product Name', dataKey:'productName'}, 
            {header:'Price', dataKey:'price'}, 
            {header:'Quantity', dataKey:'quantity'}, 
            {header:'Sub total', dataKey:'subTotal'}
        ],
        body: body,
        foot:[[ '', '', '', 'Total Amount', bill.total ]],
        columnStyles:{ index: {cellWidth:12}, price: {cellWidth: 25}, quantity: {cellWidth: 28}, subTotal: {cellWidth: 25}},
        theme:'grid'
        })
        doc.save(`${id}.pdf`)
    }

    return (
        <Button
            variant='contained'
            color='primary'
            startIcon={<GetAppIcon />}
            onClick={generatePdf}
        >
            Download Bill
        </Button>
    )
}

export default PrintBill