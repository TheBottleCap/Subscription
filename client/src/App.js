
import React from 'react'
import {Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import About from "./components/About"
import Contact from "./components/Contact"
import Register from "./components/Signup"
import Login from "./components/Login"

const App = () => {
  return (
    <div>
      <Navbar/>

      <Route exact path="/home">
        <Home />
      </Route>

      <Route path="/about">
        <About />
      </Route>

      <Route path= "/contact">
        <Contact />
      </Route>

      <Route path = "/login">
        <Login />
      </Route>

      <Route path = "/signup">
        <Register />
      </Route>

    </div>
  )
}

export default App
