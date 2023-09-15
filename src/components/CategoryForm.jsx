import { useState, useContext, useEffect } from "react"
import axios from 'axios'
import { CategoryContext } from "../App"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";

export default function CategoryForm() {
  const [name, setName] = useState('')
  const { cat, catDispatch } = useContext(CategoryContext)

  useEffect(() => {
    if (Object.keys(cat.editCat).length !== 0) {
      setName(cat.editCat.name)
    } else {
      setName('')
    }
  }, [cat.editCat])

  function catFormSubmitHandle(e) {
    e.preventDefault()
    const catObj = { name: name }
    axios.post('http://localhost:3077/api/categories', catObj)
      .then((res) => {
        catDispatch({ type: 'ADD_CATEGORY', payload: res.data })
        setName('')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  async function editCatHandle() {
    try {
      const res = await axios.put(`http://localhost:3077/api/categories/${cat.editCat._id}`, { name: name })
      catDispatch({ type: "EDIT_CAT", payload: res.data })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <form onSubmit={catFormSubmitHandle} style={{ width: '40vw' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          '& > :not(style)': { m: 1 },
        }}
      >
        <TextField
          id="demo-helper-text-aligned"
          label="Category"
          value={name}
          onInput={(e) => setName(e.target.value)}
        />
      </Box>
      {Object.keys(cat.editCat).length !== 0 ?
        <Button
          variant="contained"
          onClick={editCatHandle}>
          update
        </Button> :
        <Button
          variant="contained"
          type="submit">
          Add
        </Button>
      }
    </form>


  )
}