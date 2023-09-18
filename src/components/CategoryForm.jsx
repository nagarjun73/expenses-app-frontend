import { useState, useContext, useEffect } from "react"
import axios from 'axios'
import { CategoryContext } from "../App"
import TextField from '@mui/material/TextField';
import { Button, FormHelperText, Stack } from "@mui/material";
import { MuiColorInput } from 'mui-color-input'

export default function CategoryForm() {
  const { cat, catDispatch } = useContext(CategoryContext)
  const [name, setName] = useState('')
  const [color, setColor] = useState('')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (Object.keys(cat.editCat).length !== 0) {
      setName(cat.editCat.name)
      setColor(cat.editCat.color)
    } else {
      setName('')
      setColor('')
    }
  }, [cat.editCat])

  function catFormSubmitHandle(e) {
    e.preventDefault()
    const catObj = { name: name, color: color }
    axios.post('http://localhost:3077/api/categories', catObj)
      .then((res) => {
        catDispatch({ type: 'ADD_CATEGORY', payload: res.data })
        setName('')
        setColor('')
        setErrors({})
      })
      .catch((err) => {
        const msgArr = err.response.data.errors.reduce((acc, item) => {
          const path = item.path
          const msg = item.msg
          if (!acc[path]) {
            acc[path] = msg
          } else {
            acc[path] += ` ${msg}`
          }
          return acc
        }, {})
        setErrors(msgArr)
      })
  }

  async function editCatHandle() {
    try {
      const res = await axios.put(`http://localhost:3077/api/categories/${cat.editCat._id}`, { name: name, color: color })
      catDispatch({ type: "EDIT_CAT", payload: res.data })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <form onSubmit={catFormSubmitHandle} style={{ width: '40vw' }}>
      <Stack spacing={2}
        sx={{
          display: 'flex',
          alignItems: 'start',
        }}
      >
        <TextField
          id="demo-helper-text-aligned"
          label="Category"
          value={name}
          onInput={(e) => setName(e.target.value)}
        />
        {errors.name && <FormHelperText error>{errors.name}</FormHelperText>}
        <MuiColorInput value={color} onChange={(newValue) => setColor(newValue)} />
        {errors.color && <FormHelperText error>{errors.color}</FormHelperText>}

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
      </Stack>
    </form>


  )
}