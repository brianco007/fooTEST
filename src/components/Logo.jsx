import React from 'react'
import pokemonLogo from '../assets/pokemon-logo.png'
import './Logo.css'

const Logo = () => {
  return (
    <header>
      <img src={pokemonLogo} alt="Pokemon Logo" />
    </header>
  )
}

export default Logo