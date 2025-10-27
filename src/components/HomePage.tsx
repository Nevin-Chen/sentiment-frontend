import React from 'react'
import { Search } from '.'
import './HomePage.css'

const HomePage: React.FC = () => {
  return (
    <div className="home-container">
      <Search variant='home'/>
    </div>
  )
}

export default HomePage
