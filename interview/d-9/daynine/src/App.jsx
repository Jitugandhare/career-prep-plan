import { useState } from 'react'
import useWindowResize from './components/useWindowResize'
import useFetch from './components/useFetch';


function App() {
  const { width, height } = useWindowResize();
  const { data, loading } = useFetch("https://jsonplaceholder.typicode.com/posts")

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      <div>
        <h1 style={{ textAlign: "center" }}>Custom hooks</h1>
        <hr />
        <h1 style={{ textAlign: "center" }}>useWindowResize</h1>
        <h4 style={{ textAlign: "center" }}> width :{width}px  height:{height}px</h4>
      </div>

      <hr />

      <br />
      <br />
      <br />
      <br />
      <div style={{ border: "1px solid black", margin: "5px" }}>
        <h1 style={{ textAlign: "center" }}>useFetch hook</h1>
        {data.map((item) => (
          <div key={item.id} style={{ border: "1px solid black", margin: "5px", textAlign: "center" }}>
            <li>{item.title}</li>
            <p>{item.body}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default App