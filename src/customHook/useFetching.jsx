import { useEffect, useRef, useState } from 'react'
import axios from 'axios'

export function useFetching(api){
    const  [data, setData] = useState([])
    const  [error, setError] = useState(null)
    const  [loading, setLoading] = useState(true)
    const isMounted = useRef(true)
    useEffect(()=>{
        const controller = new AbortController();
        isMounted.current=true
          axios({
            url: api,
            signal: controller.signal
          }).then(res=>{
            if(isMounted.current){
              setData(res.data.data)
              setLoading(false)
            }
          })
          .catch(err=>{
            if(!axios.isCancel(err)) {
              if (isMounted.current) {
                setError(err);
                setLoading(false)
              }
            }
          })
          
  
        return ()=>{
          isMounted.current= false
          controller.abort();
        }
    }, [])
  
    return {data, loading, error}
}

