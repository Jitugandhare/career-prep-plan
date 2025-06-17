import React, { useEffect, useState } from 'react'

const useWindowResize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })


  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    window.addEventListener('resize', handleResize)
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowSize;
}

export default useWindowResize