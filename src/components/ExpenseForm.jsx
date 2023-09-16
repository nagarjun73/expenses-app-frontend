import TextField from '@mui/material/TextField'
import { FormControl, InputLabel, MenuItem, Select, Button, Stack, FormHelperText, Box } from '@mui/material'
import { Textarea } from '@mui/joy'
import { useContext, useReducer, useState } from 'react'
import { CategoryContext, ExpenseContext } from '../App'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios'

export default function ExpenseForm() {
  const { exp, expDispatch } = useContext(ExpenseContext)
  const { cat, catDispatch } = useContext(CategoryContext)
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [selectedCat, setSelectedCat] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState({})

  async function addExpenseHandle(e) {
    try {
      e.preventDefault()
      const expObj = {
        title: title,
        amount: amount,
        description: description,
        categoryId: selectedCat,
        expenseDate: new Date(date.$d).toJSON()?.slice(0, 10)
      }
      const res = await axios.post(`http://localhost:3077/api/expenses`, expObj)
      console.log(res)
      expDispatch({ type: "ADD_EXPENSES", payload: res.data })
      setTitle('')
      setSelectedCat('')
      setAmount('')
      setDescription('')
    } catch (e) {
      const err = e.response.data.errors
      const errors = err.reduce((acc, item) => {
        const path = item.path;
        const msg = item.msg;
        if (acc[path]) {
          acc[path] += `, ${msg}`;
        } else {
          acc[path] = msg;
        }
        return acc;
      }, {});
      console.log(errors);
      setErrors(errors)
    }
  }

  return (
    <Box sx={{
      minWidth: '25vw',
      maxWidth: '25vw'
    }}>
      <form onSubmit={addExpenseHandle}>
        <Stack spacing={2}>
          <TextField id="outlined-basic" label="Title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} />
          {errors.title && <FormHelperText>{errors.title}</FormHelperText>}

          <FormControl >
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedCat}
              label="Category"
              onChange={(e) => setSelectedCat(e.target.value)}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              {cat.categories.map((ele) => {
                return <MenuItem key={ele._id} value={ele._id}>{ele.name}</MenuItem>
              })}
            </Select>
          </FormControl>
          {errors.categoryId && <FormHelperText>{errors.categoryId}</FormHelperText>}

          <TextField id="outlined-basic" label="amount" value={amount} onChange={(e) => setAmount(e.target.value)} type="number" variant="outlined" />
          {errors.amount && <FormHelperText>{errors.amount}</FormHelperText>}

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker onChange={setDate} />
          </LocalizationProvider>
          {errors.expenseDate && <FormHelperText>{errors.expenseDate}</FormHelperText>}

          <Textarea minRows={2} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Add description...." />
          {errors.description && <FormHelperText>{errors.description}</FormHelperText>}
          <Button type="submit" variant="contained">Add Expense</Button>
        </Stack>
      </form>
    </Box >
  )
}