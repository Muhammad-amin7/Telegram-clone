import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import SubmitCode from './pages/SubmitCode'
import { Context } from './Context/Context'
import { useEffect, useState } from 'react'
import UserDetailsForm from './pages/UserDetailFill'
import Home from './pages/Home'
import userServices from './service/user.service'

export default function App() {
      const [email, setEmail] = useState()
      const navigate = useNavigate()
      
      // sendToken
      useEffect(() => {
            const token = localStorage.getItem('token')
            if (!token) return navigate('/login')
            const checkAuth = async () => {
                  try {
                        const response = await userServices.sendToken(token)

                        if (response?.status === 200 && response?.info) {
                              navigate('/home')
                        }
                        else {
                              navigate('/login')
                        }
                  } catch (error) {
                        navigate('/login')
                  }
            }
            checkAuth()
      }, [])

      return (
            <>
                  <Context.Provider value={{ email, setEmail }}>
                        <Routes>
                              <Route path="/login" element={<Login />} />
                              <Route path="/submit_code" element={<SubmitCode />} />
                              <Route path="/user_details_form" element={<UserDetailsForm />} />
                              <Route path="/home" element={<Home />} />
                        </Routes>
                  </Context.Provider>
            </>
      )
}
