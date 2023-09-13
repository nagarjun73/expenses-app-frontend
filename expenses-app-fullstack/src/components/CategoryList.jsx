import { useContext } from "react"
import { CategoryContext } from "../App"
import { List, ListItem, ListItemText, ListSubheader, Card, Button } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


export default function CategoryList() {
  const { cat, catDispatch } = useContext(CategoryContext)

  function deleteBtnHandle(ids) {
    console.log(ids)
    catDispatch({ type: "DELETE_CATEGORY", payload: ids })
  }

  return (
    <Card>
      <List style={{ width: '40vw' }}
        subheader={
          <ListSubheader color="primary">
            Categories List
          </ListSubheader>
        }>
        {cat.categories.map((ele) => {
          return <ListItem key={ele._id} >

            <ListItemText primary={ele.name} />
            <div style={{ display: 'flex', justifyContent: "space-between" }}>
              <Button variant="contained" startIcon={<EditIcon />}>
                Edit
              </Button>
              <Button variant="contained" startIcon={<DeleteIcon />} onClick={() => deleteBtnHandle(ele._id)}>
                Delete
              </Button>
            </div>
          </ListItem>
        })}
      </List>
    </Card >

  )
}