import { List, ListItem, ListItemText, ListSubheader, Card, Button } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
import { CategoryContext } from "../App";
import { useContext } from "react";
import axios from "axios";

export default function CategoryItem(props) {
  const { catEle } = props
  const { cat, catDispatch } = useContext(CategoryContext)


  async function deleteBtnHandle(ids) {
    try {
      const res = await axios.delete(`http://localhost:3077/api/categories/${ids}`)
      catDispatch({ type: "DELETE_CATEGORY", payload: res.data })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <ListItem >
        <ListItemText primary={catEle.name} />
        <div style={{ display: 'flex', justifyContent: "space-between" }}>
          <Button variant="contained" startIcon={<EditIcon />}>
            Edit
          </Button>
          <Button variant="contained" startIcon={<DeleteIcon />} onClick={() => deleteBtnHandle(catEle._id)}>
            Delete
          </Button>
        </div>
      </ListItem>
    </div>
  )
}