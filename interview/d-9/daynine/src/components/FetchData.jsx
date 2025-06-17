import React, { useEffect } from 'react'
import useFetch from "../custom hooks/useFetch";


const FetchData = () => {
  const { data, loading } = useFetch("https://jsonplaceholder.typicode.com/posts")



  if (loading) {
    return <h1>Loading...</h1>
  }
  return (
    <div style={{ border: "1px solid black", alignItems: "center", margin: "15px" }}>
      <h3 style={{ textAlign: "center" }}>useEffect on mount, handle cleanup on unmount. </h3>
      {
        data.map((item) => (
          <div key={item.id} style={{ border: "1px solid black", margin: "20px", padding: "5px", alignItems: "center" }}>

            <h5 style={{ textAlign: "center" }}>{item.title}</h5>
            <p style={{ textAlign: "center" }}>{item.body}</p>
          </div>

        ))
      }
    </div>
  )
}

export default FetchData