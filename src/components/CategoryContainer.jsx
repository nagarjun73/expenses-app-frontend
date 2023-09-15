import CategoryList from './CategoryList'
import CategoryForm from './CategoryForm'
import Stack from '@mui/material/Stack'

export default function CategoryContainer() {

  return (
    <Stack direction="row" spacing={5} justifyContent="space-around">
      <CategoryList />
      <CategoryForm />
    </Stack>
  )
}