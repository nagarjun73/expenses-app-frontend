import { useContext } from "react"
import { CategoryContext } from "../App"
import { TableRow, TableCell } from "@mui/material"

export default function ExpenseItem(props) {
  const { ele } = props
  const { cat, catDispatch } = useContext(CategoryContext)

  return (
    <TableRow>
      <TableCell>{ele.title}</TableCell>
      <TableCell>{ele.amount}</TableCell>
      <TableCell>{ele.expenseDate}</TableCell>
      <TableCell>{cat.categories.find((els) => els._id == ele.categoryId).name}</TableCell>
    </TableRow>
  )
}