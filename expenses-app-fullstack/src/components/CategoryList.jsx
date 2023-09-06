import { useContext } from "react"
import { CategoryContext } from "../App"

export default function CategoryList(){
  const{cat, catDispatch} = useContext(CategoryContext)

  return(
    <div>
      <h1>Categories List</h1>
      <ul>
        {cat.categories.map((ele)=>{
          return <li key={ele._id}>{ele.name}</li>
        })}
      </ul>
    </div>
  )
}