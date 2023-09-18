import { useContext, useEffect } from 'react';
import { Typography, Box, Stack } from '@mui/material'
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ExpenseContext } from '../App';

const Graph = () => {
  const { exp, expDispatch } = useContext(ExpenseContext)

  useEffect(() => {

  }, [exp.expenses])

  const data = [
    { name: 'A', value: 80, color: '#ff0000' },
    { name: 'B', value: 45, color: '#00ff00' },
    { name: 'C', value: 25, color: '#0000ff' },
  ];

  return (
    <Box>
      <Typography variant='h3'>Graph</Typography>
      <Stack direction='row' justifyContent='space-evenly'>
        <Box sx={{ width: "250px" }}>
          <Typography>
            Expense Distribution
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart >
              <Pie
                dataKey="value"
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={75}
                fill="#8884d8"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Box>
        <Box>
          <Typography>
            Expense By Month
          </Typography>
        </Box>
      </Stack>
    </Box>
  )
}

export default Graph