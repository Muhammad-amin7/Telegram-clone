import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SubmitCode from './pages/SubmitCode'
import { Context } from './Context/Context'
import { useState } from 'react'

export default function App() {
      const [email, setEmail] = useState()

      return (
            <>
                  <Context.Provider value={{email, setEmail}}>
                        <Routes>
                              <Route path="/login" element={<Login />} />
                              <Route path="/submit_code" element={<SubmitCode />} />
                        </Routes>
                  </Context.Provider>
            </>
      )
}
