import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SubmitCode from './pages/SubmitCode'

export default function App() {
      return (
            <>
                  <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/submit_code" element={<SubmitCode />} />
                  </Routes>
            </>
      )
}
