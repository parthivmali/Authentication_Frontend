import { Routes, Route } from 'react-router'
import Register from '../components/authentication/Register'
import Home from '../pages/Home'
import Login from '../components/authentication/Login'
import Private from './private'
import Public from './public'
import ForgotPassword from '../components/authentication/ForgotPassword'
import ResetPassword from '../components/authentication/ResetPassword'
import Error from '../pages/error'
import Profile from '../pages/Profile'
const index = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Private/>}>
              <Route path='/' element={<Home/>}/>
              <Route path='/profile' element={<Profile/>}/>
            </Route>

            <Route path='/' element={<Public/>}>
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/email-send' element={<ForgotPassword/>}/>
              <Route path='/reset-password' element={<ResetPassword/>}/>
            </Route>
            <Route path='*' element={<Error/>}/>
        </Routes>
    </div>
  )
}

export default index