import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import PlacesPage from './pages/PlacesPage'

function App() {


  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/index' index element={<IndexPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />        
        <Route path='/places' element={<PlacesPage />} />        
      </Route>
    </Routes>

  )
}

export default App
