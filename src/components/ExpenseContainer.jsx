import ExpenseTable from './ExpenseTable'
import ExpenseForm from './ExpenseForm'
import Stack from '@mui/material/Stack'

export default function ExpenseContainer() {

  return (
    <Stack direction="row" spacing={5} justifyContent="space-around">
      <ExpenseTable />
      <ExpenseForm />
    </Stack>
  )
}