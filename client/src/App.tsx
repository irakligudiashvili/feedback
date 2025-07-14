import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'
import ProtectedRoute from './utils/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import { useAuth } from './contexts/AuthContext'

function App() {
  const { loading, isLoggedIn } = useAuth();

  return (
    <Router>
      <Navbar />

      <div className='page-container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          {/* <Route path='/cart' element={<Cart />} /> */}

          {/* <Route
            path="/menu"
            element={
              isLoggedIn && (
                <Menu />
              )
            }
          /> */}

          <Route 
            path='/cart'
            element={
              isLoggedIn && (
                <Cart />
              )
            }
          />

          <Route
            path='/dashboard'
            element={
              <ProtectedRoute requiredRole='admin'>
                <Dashboard />
              </ProtectedRoute>
            }
          />

        </Routes>
      </div>
    </Router>
  )
}

export default App
