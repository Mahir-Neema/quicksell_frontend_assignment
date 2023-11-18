import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Card from './Components/Card/Card'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <div style={{display:"flex",flexWrap:"wrap", justifyContent:"center"}}>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      </div>
      {/* <Card/> */}
    </>
  )
}

export default App
