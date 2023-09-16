import { useContext } from "react"
import { ExpenseContext } from "../App"
import ExpenseItem from "./ExpenseItem"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import ListSubheader from '@mui/material/ListSubheader'

export default function ExpenseTable(props) {

  const { exp, expDispatch } = useContext(ExpenseContext)
  console.log(exp)


  return (
    <TableContainer component={Paper} style={{ width: '60vw' }} elevation={3}>
      <ListSubheader color="primary">
        Expenses List
      </ListSubheader>
      <Table sx={{ minWidth: 650 }} aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exp.expenses.map((ele) => {
            return <ExpenseItem key={ele._id} expEle={ele} />
          })}
        </TableBody>
      </Table>
    </TableContainer>

  )
}