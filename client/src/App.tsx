import {Route, Routes} from "react-router-dom";
import SignUpPage from "./pages/SignUpPage"
import Navbar from "./pages/Navbar";
import {Toaster} from '@/components/ui/sonner'
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
function App() {
  return (
    <>
    <Navbar />
    <hr></hr>
    <Routes>
      <Route path="/signup" element={<SignUpPage />}/>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
    <Toaster />
    </>
  )
}

export default App