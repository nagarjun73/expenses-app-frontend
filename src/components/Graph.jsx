import { useContext, useEffect, useState } from 'react';
import { Typography, Box, Stack } from '@mui/material'
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { CategoryContext, ExpenseContext } from '../App';

const Graph = () => {
  const { exp, expDispatch } = useContext(ExpenseContext)
  const { cat, catDispatch } = useContext(CategoryContext)
  const [pieData, setPieData] = useState([])
  const [barData, setBarData] = useState([])

  useEffect(() => {
    const data = cat.categories.map((ele) => {
      return {
        name: ele.name,
        value: exp.expenses.reduce((acc, item) => {
          if (item.categoryId == ele._id) {
            acc += item.amount
          }
          return acc
        }, 0),
        color: ele.color
      }
    })
    setPieData(data)

    const expSort = exp.expenses.sort((a, b) => new Date(a.expenseDate) - new Date(b.expenseDate))
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const monthObj = expSort.reduce((acc, item) => {
      const monthName = months[new Date(item.expenseDate).getMonth()]
      if (acc.hasOwnProperty(monthName)) {
        acc[monthName].push([cat.categories.find((ele) => ele._id == item.categoryId).name, item.amount])
      } else {
        acc[monthName] = [[cat.categories.find((ele) => ele._id == item.categoryId).name, item.amount]]
      }
      return acc
    }, {})

    const helperFun = ([name, arr]) => {
      const obj = { name: name }
      arr.forEach(ele => {
        obj[ele[0]] = ele[1]
      })
      return obj
    }
    const map = Object.entries(monthObj).map((ele) => {
      return helperFun(ele)
    })
    setBarData(map)
  }, [cat.categories, exp.expenses])


  return (
    <Box>
      <Typography variant='h3'>Graph</Typography>
      <Stack direction='row' justifyContent='space-evenly'>
        <Box sx={{ width: "300px" }}>
          <Typography>
            Expense Distribution
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart >
              <Pie
                dataKey="value"
                data={pieData}
                labelLine={false}
                cx="50%"
                cy="50%"
                outerRadius={75}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
        <Box sx={{ width: "400px" }}>
          <Typography>
            Expense By Month
          </Typography>
          <ResponsiveContainer width="99%" height={250}>
            <BarChart
              width={500}
              height={300}
              data={barData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {cat.categories.map((ele, i) => {
                return <Bar key={i} dataKey={ele.name} stackId="a" fill={ele.color} />
              })}
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Stack>
    </Box>
  )
}

export default Graph