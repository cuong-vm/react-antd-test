import { Outlet } from 'react-router-dom'
import Menu from './components/Menu'

const Main: React.FC = () => {
  return (
    <div className='App'>
      <div className='App-menu'>
        <Menu />
      </div>
      <div className='App-content'>
        <Outlet />
      </div>
    </div>
  )
}

export default Main
