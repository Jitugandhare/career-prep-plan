import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {increment , decrement} from '../redux/actions/counterAction'


const Counter = () => {
  const count = useSelector((store) => store.counter.count);
  const dispatch = useDispatch()
  return (
    <div>
      <h1>Count:{count}</h1>
      <button onClick={()=>dispatch(increment())}>Inc</button>
      <button onClick={()=>dispatch(decrement())}>Dec</button>
    </div>
  )
}

export default Counter