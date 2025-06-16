import { useState } from 'react'
import useWindowResize from './components/useWindowResize'


function App() {
  const { width, height } = useWindowResize();

  return (
    <>
      <h1 style={{textAlign:"center"}}>Custom hooks</h1>
      <hr />
      <p style={{textAlign:"center"}}>useWindowResize</p>
      <h4 style={{textAlign:"center"}}> width :{width}px  height:{height}px</h4>
      <hr />
    </>
  )
}

export default App