import { useState } from 'react'
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header />
    <div className="wrapper">
      <Outlet />
      <Footer />
    </div>
    </>
  )
}

export default App
