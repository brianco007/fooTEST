import React from 'react'
import Home from './components/Home.jsx'
import PokemonDetails from './components/PokemonDetails.jsx'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <Routes>
      <Route path='/fooTEST' element={< Home /> } />
      <Route path='/details/:id' element={<PokemonDetails /> } />
    </Routes>
  )
}

export default App
