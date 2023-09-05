import { useContext } from "react"
import { CategoryContext } from "../App"

export default function ExpenseItem(props){
  const { ele } = props
  const {cat, catDispatch} = useContext(CategoryContext)

  return(
    <tr>
      <td>{ele.title}</td>
      <td>{ele.amount}</td>
      <td>{ele.expenseDate}</td>
      <td>{cat.categories.find((els)=> els._id == ele.categoryId).name}</td>
    </tr>
  )
}