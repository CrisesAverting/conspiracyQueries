import { useState } from 'react'
import Nav from './components/Nav';
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Nav />
    <div className="wrapper">
      <Outlet />
      <Footer />
    </div>
    </>
  )
}

export default App
