import { useContext } from "react"
import {ExpenseContext } from "../App"
import ExpenseItem from "./ExpenseItem"

export default function ExpenseTable(props){

  const{exp, expDispatch} = useContext(ExpenseContext)
  console.log(exp)

  return(
    <div>
      <table border="1">
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {exp.expenses.map((ele)=>{
            return <ExpenseItem key={ele._id} ele={ele}/>
          })}
        </tbody>
      </table>
    </div>
  )
}