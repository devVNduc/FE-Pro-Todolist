import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

function Demo(){
  var [x, setX] = useState("")
  function onChange(e){
    setX(e.target.value)
  }

  return <>
    <input value={x} onChange={onChange}/>
    <input value={x} onChange={onChange}/>
  </>
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Demo/>
  </React.StrictMode>,
)
