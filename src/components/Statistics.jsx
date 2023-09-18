import { Card, CardContent, Stack, Typography } from '@mui/material'
import { useContext, useEffect, useState, PureComponent } from 'react'
import { CategoryContext, ExpenseContext } from '../App'
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';

export default function Statistics() {
  const [totalAmt, setTotalAmt] = useState(0)
  const [mostSpent, setMostSpent] = useState('')

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
    }
  }, [exp.expenses])

  const data = [
    {
      name: 'aug',
      amt: 1000,
    },
    {
      name: 'sep',
      amt: 2500,
    },
    {
      name: 'oct',
      amt: 3000,
    },
    {
      name: 'nov',
      amt: 3500,
    },
  ];

  return (
    <Stack direction='row' justifyContent={'space-evenly'} sx={{ paddingTop: "10vh", width: '75vw' }}>
      <Card sx={{ backgroundColor: 'primary.main', borderRadius: '10px', width: '20vw' }}>
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
              <XAxis dataKey="name" stroke="#ffffff" />
              <YAxis stroke="#ffffff" />
              <Area type="monotone" dataKey="amt" stroke="#ffffff" fill="#ffffff" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Stack >

  )
}