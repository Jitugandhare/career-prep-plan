import React, { useEffect, useState } from 'react'

const useFetch = (url, options = {}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);





    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            setLoading(true)
            try {
                const data = await fetch(url);
                const res = await data.json();
                console.log(res)

                if (isMounted) {

                    setData(res)
                }
            } catch (error) {
                console.log(error)
                setData([])
            } finally {
                setLoading(false)
            }
        }


        fetchData();

        return () => {
            isMounted = false;
        }
    }, [url])

    return { data, loading }
}

export default useFetch