import { useEffect, useRef, useState } from 'react'
import axios from 'axios'

export function useFetching(api){
    const  [data, setData] = useState([])
    const  [error, setError] = useState(null)
    const  [loading, setLoading] = useState(true)
    const [loadCount, setLoadCount] = useState(0)
    const [page, setPage] = useState({
      page: 1,
      pageCount: 5,
      pageSize: 20,
      total: 50
    })
    const isMounted = useRef(true)
    useEffect(()=>{
        const controller = new AbortController();
        isMounted.current=true
          axios({
            url: `${api}?pagination[page]=${page.page}&pagination[pageSize]=${page.pageSize}`,
            signal: controller.signal
          }).then(res=>{
            if(isMounted.current){
              setPage({
                ...res.data.meta.pagination,
              })
              setData(res.data.data)
              setLoading(false)
              setError(null)
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
    }, [api, page.page, page.pageSize, loadCount])
    function loadPage(page, pageSize){
      setLoading(true)
      setPage(prev=>{
        return {...prev, page: page, pageSize: pageSize}
      })
    }
    function nextPage(){
      if(page.page < page.pageCount){
        setLoading(true)
        setPage(prev=>{
          return {...prev, page: prev.page + 1}
        })
      }
    }
    function prevPage(){
      if(page.page > 1 ){
        setLoading(true)
        setPage(prev=>{
          return {...prev, page: prev.page - 1}
        })
      }
    }

    function reload(){
      setLoading(true)
      setLoadCount(loadCount + 1)
    }
    
    return {data, loading, error, page, loadPage, nextPage, prevPage, reload}
}

