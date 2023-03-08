import React from 'react'
import logo from '../logo.svg'

const WelcomePage: React.FC = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
      </header>
      <h4>Welcome</h4>
    </div>
  )
}

export default WelcomePage
