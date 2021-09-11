import { CircularProgress, Container } from '@material-ui/core'
import React from 'react'
import { Chart } from 'react-google-charts'
import { useSelector } from 'react-redux'

const BarChart = (props) => {
    const bills = useSelector(state => state.bills)
    const products = useSelector(state => state.products)
    const customers = useSelector(state => state.customers)

    const chartData = [['Customers', customers.length], ['Products', products.length], ['Orders', bills.length]]

    return (
        <Container>
            <Chart 
                width={'100%'}
                height={'300px'}
                chartType='Bar'
                loader={<CircularProgress />}
                data={[['category', 'total in number'],...chartData]}
                options={{
                    chart: {
                        title: 'Complete Statistics',
                        subtitle: 'Customers, Products, Orders'
                    }
                }}
            />
        </Container>
    )
}

export default BarChart