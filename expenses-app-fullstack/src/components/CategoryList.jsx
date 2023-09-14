import { useContext } from "react"
import { CategoryContext } from "../App"
import CategoryItem from './CategoryItem'
import { List, ListSubheader, Card } from "@mui/material"

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


export default function CategoryList() {
  const { cat, catDispatch } = useContext(CategoryContext)

  return (
    <Card>
      <List style={{ width: '40vw' }}
        subheader={
          <ListSubheader color="primary">
            Categories List
          </ListSubheader>
        }>
        {cat.categories.map((ele, i) => {
          return <CategoryItem key={i} catEle={ele} />
        })}
      </List>
    </Card >
  )
}