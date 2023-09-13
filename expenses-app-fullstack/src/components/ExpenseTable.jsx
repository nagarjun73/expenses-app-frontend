import { useContext } from "react"
import { ExpenseContext } from "../App"
import ExpenseItem from "./ExpenseItem"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


export default function ExpenseTable(props) {

  const { exp, expDispatch } = useContext(ExpenseContext)
  console.log(exp)


  return (
    <TableContainer component={Paper} elevation={3}>
      <Table sx={{ minWidth: 650 }} aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Category</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exp.expenses.map((ele) => {
            return <ExpenseItem key={ele._id} ele={ele} />
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}