import React from 'react'
import './Header.css'

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">Sentiment<span className="logo-accent">AI</span></div>
        <div className="header-center"></div>
        <div className="header-right"></div>
      </div>
    </header>
  )
}

export default Header
