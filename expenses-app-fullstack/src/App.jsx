import {useEffect, useReducer, useContext, createContext } from 'react'
import CategoryContainer from './components/CategoryContainer'
import Statistics from './components/Statistics'
import ExpenseContainer from './components/ExpenseContainer'
import Graph from './components/Graph'
import axios from 'axios'

export const CategoryContext = createContext()
export const ExpenseContext = createContext()


function reducerCat(state, action){
  switch(action.type){
    case "ADD_CATEGORY":{
      return {...state, categories:[action.payload, ...state.categories]}
    }
    case "FETCH_CATEGORIES":{
      return {...state, categories:[...action.payload]}
    }
  }
}

function reducerExp(state, action){
  switch(action.type){
    case "FETCH_EXPENSES":{
      return{...state, expenses:[...action.payload]}
    }
  }
}

function App() {
  const initialStateCat = {
    categories:[]
  }

  const initialStateExp = {
    expenses:[]
  }

  const[cat, catDispatch] = useReducer(reducerCat, initialStateCat)
  const[exp, expDispatch] = useReducer(reducerExp, initialStateExp)
  console.log(cat.categories)

  useEffect(()=>{
    const promisedRes = ['categories','expenses'].map((ele)=>{
      return axios.get(`http://localhost:3077/api/${ele}`)
      .then((res)=>{
        return res.data
        // catDispatch({type:"FETCH_CATEGORIES", payload:res.data})
      })
      .catch((err)=>{
        console.log(err)
      })
    })

    Promise.all(promisedRes)
      .then((res)=>{
        console.log(res)
        catDispatch({type:"FETCH_CATEGORIES", payload:res[0]})
        expDispatch({type:"FETCH_EXPENSES", payload:res[1]})
      })
      .catch((err)=>{
        console.log(err)
      })
    
  },[])

  return (
    <div>
      <CategoryContext.Provider value={{cat, catDispatch}}>
      <ExpenseContext.Provider value={{exp, expDispatch}}>
      <Statistics/>
      <CategoryContainer/>
      <ExpenseContainer/>
      <Graph/>
      </ExpenseContext.Provider>
      </CategoryContext.Provider>
    </div>
  )
}

export default App
