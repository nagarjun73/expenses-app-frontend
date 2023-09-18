import { Card, CardContent, Stack, Typography } from '@mui/material'
import { useContext, useEffect, useState, PureComponent } from 'react'
import { CategoryContext, ExpenseContext } from '../App'
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';

export default function Statistics() {
  const [totalAmt, setTotalAmt] = useState(0)
  const [mostSpent, setMostSpent] = useState('')
  const [data, setData] = useState([])

  const { exp, expDispatch } = useContext(ExpenseContext)
  const { cat, catDispatch } = useContext(CategoryContext)


  useEffect(() => {
    if (exp.expenses.length !== 0) {
      const total = exp.expenses.reduce((acc, item) => {
        return acc + (item.amount)
      }, 0)
      setTotalAmt(total)

      const mstSpntObj = exp.expenses.reduce((acc, item) => {
        const category = cat.categories.find((ele) => ele._id == item.categoryId).name
        const amount = item.amount
        if (acc[category]) {
          acc[category] += amount
        } else {
          acc[category] = amount
        }
        return acc
      }, {})
      const vls = Object.values(mstSpntObj)
      const mostSpend = Object.keys(mstSpntObj).find((ele) => mstSpntObj[ele] == Math.max(...vls))
      setMostSpent(mostSpend)

      const monthlySorted = exp.expenses.sort((a, b) => new Date(a.expenseDate) - new Date(b.expenseDate))
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const monthObj = monthlySorted.reduce((acc, item) => {
        const monthName = months[new Date(item.expenseDate).getMonth()]
        if (acc.hasOwnProperty(monthName)) {
          acc[monthName] += item.amount
        } else {
          acc[monthName] = item.amount
        }
        return acc
      }, {})
      const data = Object.keys(monthObj).map((key) => {
        return { name: key, amt: monthObj[key] }
      })
      setData(data.slice(-3, data.length))
    }
  }, [exp.expenses])

  return (
    <Stack direction='row' justifyContent={'space-evenly'} sx={{ paddingTop: "10vh", }}>
      <Card sx={{ backgroundColor: 'primary.main', borderRadius: '10px', width: '20vw', }}>
        <CardContent >
          <Typography variant='h5' color="#bbdefb" >Total Amount</Typography>
          <Typography variant='h3' color="#ffffff">{totalAmt}</Typography>
        </CardContent>
      </Card>
      <Card sx={{ backgroundColor: 'primary.main', borderRadius: '10px', width: '20vw' }}>
        <CardContent>
          <Typography variant='h5' color="#bbdefb" >Most spent</Typography>
          <Typography variant='h3' color="#ffffff" >{mostSpent}</Typography>
        </CardContent>
      </Card>
      <Card sx={{ backgroundColor: 'primary.main', borderRadius: '10px', width: '20vw' }}>
        <CardContent>
          <Typography variant='h5' color="#bbdefb" >Expense Trend</Typography>

          <ResponsiveContainer width={'99%'} height={100}>
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 40,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#ffffff" />
              <YAxis stroke="#ffffff" />
              <Tooltip />
              <Area type="monotone" dataKey="amt" stroke="#ffffff" fill="#ffffff" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Stack >

  )
}