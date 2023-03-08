import { Provider } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Main from './layout/Main'
import CounterPage from './pages/CounterPage'
import TodoPage from './pages/TodoPage'
import UserPage from './pages/UserPage'
import WelcomePage from './pages/WelcomePage'
import store from './redux/store'

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<Main />}>
          <Route path='' element={<WelcomePage />} />
          <Route path='counter' element={<CounterPage />} />
          <Route path='todos' element={<TodoPage />} />
          <Route path='users' element={<UserPage />} />
        </Route>
      </Routes>
    </Provider>
  )
}

export default App
