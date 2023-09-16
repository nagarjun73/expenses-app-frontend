import { useContext } from "react"
import { CategoryContext, ExpenseContext } from "../App"
import { TableRow, TableCell, Button, ButtonGroup } from "@mui/material"
import axios from 'axios'

export default function ExpenseItem(props) {
  const { exp, expDispatch } = useContext(ExpenseContext)
  const { ele } = props
  const { cat, catDispatch } = useContext(CategoryContext)

  async function deleteExpensesHandle() {
    try {
      const res = await axios.delete(`http://localhost:3077/api/expenses/${ele._id}`)
      expDispatch({ type: "DELETE_EXPENSES", payload: res.data })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <TableRow>
      <TableCell>{ele.title}</TableCell>
      <TableCell>{ele.amount}</TableCell>
      <TableCell>{ele.expenseDate?.slice(0, 10)}</TableCell>
      <TableCell>{cat.categories.find((els) => els._id == ele.categoryId).name}</TableCell>
      <TableCell>
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button>edit</Button>
          <Button onClick={deleteExpensesHandle}>delete</Button>
        </ButtonGroup>
      </TableCell>
    </TableRow>
  )
}