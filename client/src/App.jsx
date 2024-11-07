import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import PlacesPage from './pages/PlacesPage'
import UserProvider from './components/userContext'
import axios from 'axios'
import AccountPage from './pages/AccountPage'

const UserContextProvider = UserProvider.userContextProvider

axios.defaults.withCredentials = true

function App() {

  const navegar = useNavigate()

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' Component={Layout}>
          <Route path='/' index Component={IndexPage} />
          <Route path='/login' Component={LoginPage} />
          <Route path='/register' Component={RegisterPage} />
          <Route path='/account/:subpage?' Component={AccountPage} />
          <Route path='/account/:subpage/:action' Component={AccountPage} />
          {/* <Route path='/logout' element={<h1 onClick={() => { navegar(-1) }}>logout</h1>} /> */}
          <Route path='/*' element={<h1 onClick={() => { navegar(-1) }}>404</h1>} />
        </Route>
      </Routes>
    </UserContextProvider>

  )
}

export default App
