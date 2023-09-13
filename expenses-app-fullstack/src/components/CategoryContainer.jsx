import CategoryList from './CategoryList'
import CategoryForm from './CategoryForm'

export default function CategoryContainer() {

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <CategoryList />
      <CategoryForm />
    </div>
  )
}