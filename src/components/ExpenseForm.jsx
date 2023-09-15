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
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <form onSubmit={addExpenseHandle}>
        <Stack spacing={2}>
          <TextField id="outlined-basic" label="Title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} />
          <FormHelperText>hh</FormHelperText>

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

          <TextField id="outlined-basic" label="amount" value={amount} onChange={(e) => setAmount(e.target.value)} type="number" variant="outlined" />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker onChange={setDate} />
          </LocalizationProvider>

          <Textarea minRows={2} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Add description...." />
          <Button type="submit" variant="contained">Add Expense</Button>
        </Stack>
      </form>
    </div>
  )
}