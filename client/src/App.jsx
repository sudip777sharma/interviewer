import React, { createContext, useReducer } from 'react'
import { Route, Switch } from 'react-router-dom'

import './App.css'

import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Login from './components/Login'
import Signup from './components/Signup'
import Logout from './components/Logout'
import Practice from './components/Practice'
import Interview from './components/Interview'
import Result from './components/Result'
import Instruction from './components/Instruction'

import { initialState, reducer } from './components/UseReducer'
// import Loading from './components/Loading'

export const UserContext = createContext();
const Routing = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path='/practice'>
        <Practice />
      </Route>

      <Route exact path='/instruction'>
        <Instruction />
      </Route>

      <Route exact path='/interview'>
        <Interview />
      </Route>

      <Route path="/about">
        <About />
      </Route>

      <Route path="/contact">
        <Contact />
      </Route>

      <Route path="/login">
        <Login />
      </Route>

      <Route path="/signup">
        <Signup />
      </Route>

      <Route path="/logout">
        <Logout />
      </Route>

      <Route path="/result">
        <Result />
      </Route>

      {/* <Route path="/loading">
        <Loading/>
      </Route> */}

    </Switch >

  )
}

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState);
  console.log('App.jsx --> state: ', state);
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routing />
      </UserContext.Provider>
    </>
  )
}

export default App
