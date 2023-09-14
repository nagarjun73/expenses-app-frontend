import { List, ListItem, ListItemText, ListSubheader, Card, Button } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
import { CategoryContext } from "../App";
import { useContext } from "react";
import axios from "axios";

export default function CategoryItem(props) {
  const { catEle } = props
  const { cat, catDispatch } = useContext(CategoryContext)

  async function deleteBtnHandle() {
    try {
      const res = await axios.delete(`http://localhost:3077/api/categories/${catEle._id}`)
      catDispatch({ type: "DELETE_CATEGORY", payload: res.data })
    } catch (e) {
      console.log(e)
    }
  }

  function editBtnHandle() {
    catDispatch({ type: "UPDATE_EDIT_FORM", payload: catEle })
  }

  return (
    <div>
      <ListItem >
        <ListItemText primary={catEle.name} />
        <div style={{ display: 'flex', justifyContent: "space-between" }}>
          <Button variant="contained" startIcon={<EditIcon />} onClick={editBtnHandle}>
            Edit
          </Button>
          <Button variant="contained" startIcon={<DeleteIcon />} onClick={deleteBtnHandle}>
            Delete
          </Button>
        </div>
      </ListItem>
    </div>
  )
}