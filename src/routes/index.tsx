import { Routes, Route } from 'react-router'
import Register from '../components/authentication/Register'
import Home from '../pages/Home'
import Login from '../components/authentication/Login'

const index = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
        </Routes>
    </div>
  )
}

export default index