import TextField from '@mui/material/TextField'
import { FormControl, InputLabel, MenuItem, Select, Button, Stack, FormHelperText, Box } from '@mui/material'
import { Textarea } from '@mui/joy'
import { useContext, useEffect, useState } from 'react'
import { CategoryContext, ExpenseContext } from '../App'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import axios from 'axios'

export default function ExpenseForm() {
  const { exp, expDispatch } = useContext(ExpenseContext)
  const { cat, catDispatch } = useContext(CategoryContext)
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [selectedCat, setSelectedCat] = useState('')
  const [date, setDate] = useState(null)
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState({})
  console.log(date)

  useEffect(() => {
    if (Object.keys(exp.editExp).length !== 0) {
      setTitle(exp.editExp.title)
      setAmount(exp.editExp.amount)
      setDate(dayjs(new Date(exp.editExp.expenseDate)))
      setSelectedCat(exp.editExp.categoryId)
      setDescription(exp.editExp.description)
    } else {
      setTitle('')
      setDescription('')
      setAmount('')
      setSelectedCat('')
    }
  }, [exp.editExp])

  async function expenseHandle(e) {
    try {
      e.preventDefault()
      const expObj = {
        title: title,
        amount: amount,
        description: description,
        categoryId: selectedCat,
        expenseDate: date ? new Date(date).toJSON()?.slice(0, 10) : ''
      }
      console.log(expObj)

      if (Object.keys(exp.editExp).length == 0) {
        const res = await axios.post(`http://localhost:3077/api/expenses`, expObj)
        console.log(res)
        expDispatch({ type: "ADD_EXPENSES", payload: res.data })
      } else {
        const res = await axios.put(`http://localhost:3077/api/expenses/${exp.editExp._id}`, expObj)
        console.log(res)
        expDispatch({ type: "EDIT_EXPENSES", payload: res.data })
      }
      setTitle('')
      setSelectedCat('')
      setAmount('')
      setDescription('')
      setDate(null)
    } catch (e) {
      const err = e.response.data.errors
      console.log(err)
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
      setErrors(errors)
    }
  }

  return (
    <Box sx={{
      minWidth: '25vw',
      maxWidth: '25vw'
    }}>
      <form onSubmit={expenseHandle}>
        <Stack spacing={2}>
          <TextField id="outlined-basic" label="Title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} />
          {errors.title && <FormHelperText error>{errors.title}</FormHelperText>}

          <FormControl >
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedCat}
              label="Category"
              onChange={(e) => setSelectedCat(e.target.value)}
            >
              {cat.categories.map((ele) => {
                return <MenuItem key={ele._id} value={ele._id}>{ele.name}</MenuItem>
              })}
            </Select>
          </FormControl>
          {errors.categoryId && <FormHelperText error>{errors.categoryId}</FormHelperText>}

          <TextField id="outlined-basic" label="amount" value={amount} onChange={(e) => setAmount(e.target.value)} type="number" variant="outlined" />
          {errors.amount && <FormHelperText error>{errors.amount}</FormHelperText>}

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker value={date}
              onChange={(newValue) => setDate(newValue.$d)} />
          </LocalizationProvider>
          {errors.expenseDate && <FormHelperText error>{errors.expenseDate}</FormHelperText>}

          <Textarea minRows={2} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Add description...." />
          {errors.description && <FormHelperText error>{errors.description}</FormHelperText>}

          {Object.keys(exp.editExp).length == 0 ?
            <Button type="submit" variant="contained">Add Expense</Button> :
            <Button type="submit" variant="contained">update Expense</Button>
          }
        </Stack>
      </form>
    </Box >
  )
}