import React, { useEffect, useState } from 'react'

const useFetch = (url, options = {}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true)
        try {
            const data = await fetch(url);
            const res = await data.json();
            console.log(res)
            setData(res)
        } catch (error) {
            console.log(error)
            setData([])
        }finally{
            setLoading(false)
        }
    }


    useEffect(() => {
        fetchData()
    }, [])

    return { data, loading }
}

export default useFetch