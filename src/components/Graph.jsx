import { useContext, useEffect, useState } from 'react';
import { Typography, Box, Stack } from '@mui/material'
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { CategoryContext, ExpenseContext } from '../App';

const Graph = () => {
  const { exp, expDispatch } = useContext(ExpenseContext)
  const { cat, catDispatch } = useContext(CategoryContext)
  const [pieData, setPieData] = useState([])

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
  }, [cat.categories, exp.expenses])

  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
  ];

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
              data={data}
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
              <Bar dataKey="pv" stackId="a" fill="#8884d8" />
              <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Stack>
    </Box>
  )
}

export default Graph