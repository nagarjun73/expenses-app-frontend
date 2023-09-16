import { useContext } from "react"
import { CategoryContext, ExpenseContext } from "../App"
import { TableRow, TableCell, Button, ButtonGroup } from "@mui/material"
import axios from 'axios'

export default function ExpenseItem(props) {
  const { exp, expDispatch } = useContext(ExpenseContext)
  const { expEle } = props
  const { cat, catDispatch } = useContext(CategoryContext)

  async function editExpenseHandle() {
    try {
      console.log(expEle)
      expDispatch({ type: "UPDATE_EXP_FORM", payload: expEle })
    } catch (e) {
      console.log(e)
    }
  }

  async function deleteExpensesHandle() {
    try {
      const res = await axios.delete(`http://localhost:3077/api/expenses/${expEle._id}`)
      expDispatch({ type: "DELETE_EXPENSES", payload: res.data })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <TableRow>
      <TableCell>{expEle.title}</TableCell>
      <TableCell>{expEle.amount}</TableCell>
      <TableCell>{expEle.expenseDate?.slice(0, 10)}</TableCell>
      <TableCell>{cat.categories.find((els) => els._id == expEle.categoryId).name}</TableCell>
      <TableCell>
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button onClick={editExpenseHandle}>edit</Button>
          <Button onClick={deleteExpensesHandle}>delete</Button>
        </ButtonGroup>
      </TableCell>
    </TableRow>
  )
}