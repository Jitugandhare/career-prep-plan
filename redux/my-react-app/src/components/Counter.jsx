import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from '../redux/action';

const Counter = () => {
    const count = useSelector(state => state.count);
    const dispatch = useDispatch()

    return (
        <div>
            <h1>Counter using Redux</h1>
            <h3>Count:{count}</h3>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
        </div>
    )
}

export default Counter