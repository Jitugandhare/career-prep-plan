import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Todo = () => {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const API_URL = 'http://localhost:3000/todos'

  // Fetch todos
  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL)
      setTodos(response.data)
      setLoading(false)
    } catch (err) {
      setError('Failed to fetch todos')
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Create a new todo
  const addTodo = async () => {
    if (!newTodo.trim()) return
    try {
      const response = await axios.post(API_URL, {
        title: newTodo,
        completed: false,
      })
      setTodos([...todos, response.data])
      setNewTodo('')
    } catch (err) {
      setError('Failed to add todo')
    }
  }

  // Update a todo (toggle completed)
  const toggleComplete = async (id, completed) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`, {
        completed: !completed,
      })
      setTodos(todos.map(todo => (todo.id === id ? response.data : todo)))
    } catch (err) {
      setError('Failed to update todo')
    }
  }

  // Delete a todo
  const deleteTodo = async id => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      setTodos(todos.filter(todo => todo.id !== id))
    } catch (err) {
      setError('Failed to delete todo')
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <h1>Todo List</h1>

      <input
        type="text"
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
        placeholder="Enter a new task"
      />
      <button onClick={addTodo}>Add</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              onClick={() => toggleComplete(todo.id, todo.completed)}
              style={{
                cursor: 'pointer',
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)} style={{ marginLeft: '10px' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Todo
