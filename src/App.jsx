import { useEffect, useReducer, useContext, createContext } from 'react'
import CategoryContainer from './components/CategoryContainer'
import Statistics from './components/Statistics'
import ExpenseContainer from './components/ExpenseContainer'
import Graph from './components/Graph'
import axios from 'axios'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

export const CategoryContext = createContext()
export const ExpenseContext = createContext()

function reducerCat(state, action) {
  switch (action.type) {
    case "ADD_CATEGORY": {
      return { ...state, categories: [...state.categories, action.payload] }
    }
    case "FETCH_CATEGORIES": {
      return { ...state, categories: [...action.payload] }
    }
    case "DELETE_CATEGORY": {
      return { ...state, categories: state.categories.filter((ele) => ele._id !== action.payload._id) }
    }
    case "UPDATE_EDIT_FORM": {
      return { ...state, editCat: action.payload }
    }
    case "EDIT_CAT": {
      const finCat = state.categories.map((ele) => {
        if (ele._id == action.payload._id) {
          return action.payload
        } else {
          return ele
        }
      })
      return { ...state, categories: finCat, editCat: {} }
    }
  }
}

function reducerExp(state, action) {
  switch (action.type) {
    case "FETCH_EXPENSES": {
      return { ...state, expenses: [...action.payload] }
    }
    case "ADD_EXPENSES": {
      return { ...state, expenses: [...state.expenses, action.payload] }
    }

    case "UPDATE_EXP_FORM": {
      return { ...state, editExp: action.payload }
    }

    case "EDIT_EXPENSES": {
      const editedExp = state.expenses.map((ele) => {
        if (ele._id == action.payload._id) {
          return action.payload
        } else {
          return ele
        }
      })
      return { ...state, expenses: editedExp, editExp: {} }
    }

    case "DELETE_EXPENSES": {
      return { ...state, expenses: state.expenses.filter((ele) => ele._id !== action.payload._id) }
    }
  }
}

function App() {
  const initialStateCat = {
    categories: [],
    editCat: {}
  }

  const initialStateExp = {
    expenses: [],
    editExp: {}
  }

  const [cat, catDispatch] = useReducer(reducerCat, initialStateCat)
  const [exp, expDispatch] = useReducer(reducerExp, initialStateExp)
  console.log(cat.categories)

  useEffect(() => {
    const promisedRes = ['categories', 'expenses'].map((ele) => {
      return axios.get(`http://localhost:3077/api/${ele}`)
        .then((res) => {
          return res.data
          // catDispatch({type:"FETCH_CATEGORIES", payload:res.data})
        })
        .catch((err) => {
          console.log(err)
        })
    }, [cat.categories])

    Promise.all(promisedRes)
      .then((res) => {
        console.log(res)
        catDispatch({ type: "FETCH_CATEGORIES", payload: res[0] })
        expDispatch({ type: "FETCH_EXPENSES", payload: res[1] })
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div>
      <CategoryContext.Provider value={{ cat, catDispatch }}>
        <ExpenseContext.Provider value={{ exp, expDispatch }}>
          <Stack spacing={5}>
            <Typography variant="h2" sx={{ display: "flex", justifyContent: "center" }}>Expense App</Typography>
            <Statistics />
            <CategoryContainer />
            <ExpenseContainer />
            <Graph />
          </Stack>
        </ExpenseContext.Provider>
      </CategoryContext.Provider>
    </div>
  )
}

export default App
