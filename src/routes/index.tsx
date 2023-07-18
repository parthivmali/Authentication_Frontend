import { Routes, Route } from 'react-router'
import Register from '../components/authentication/Register'
import Home from '../pages/Home'
import Login from '../components/authentication/Login'
import Private from './private'
import Public from './public'
import ForgotPassword from '../components/authentication/ForgotPassword'
import ResetPassword from '../components/authentication/ResetPassword'

const index = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Private/>}>
              <Route path='/' element={<Home/>}/>
            </Route>

            <Route path='/' element={<Public/>}>
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/email-send' element={<ForgotPassword/>}/>
              <Route path='/reset-password' element={<ResetPassword/>}/>
            </Route>
        </Routes>
    </div>
  )
}

export default index