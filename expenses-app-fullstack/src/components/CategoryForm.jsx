import { useState, useContext } from "react"
import axios from 'axios'
import { CategoryContext } from "../App"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";

export default function CategoryForm() {
  const [name, setName] = useState('')
  const { cat, catDispatch } = useContext(CategoryContext)

  function catFormSubmitHandle(e) {
    e.preventDefault()
    const catObj = { name: name }
    axios.post('http://localhost:3077/api/categories', catObj)
      .then((res) => {
        catDispatch({ type: 'ADD_CATEGORY', payload: res.data })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    // <div>
    //   <h1>Add Category</h1>
    //   <form onSubmit={catFormSubmitHandle}>
    //     <label>Name</label>
    //     <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

    //     <input type="submit" />
    //   </form>
    // </div>

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
      <Button
        variant="contained"
        type="submit">
        Add
      </Button>
    </form>
  )
}