import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SubmitCode from './pages/SubmitCode'
import { Context } from './Context/Context'
import { useState } from 'react'
import UserDetailsForm from './pages/UserDetailFill'
import Home from './pages/Home'

export default function App() {
      const [email, setEmail] = useState()

      return (
            <>
                  <Context.Provider value={{email, setEmail}}>
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
