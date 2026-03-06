import {Route, Routes} from "react-router-dom";
import SignUpPage from "./pages/SignUpPage"
import Navbar from "./pages/Navbar";
import {Toaster} from '@/components/ui/sonner'
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ExplorePage from "./pages/ExplorePage";
import SightingsPage from "./pages/Signtings";

function App() {
  return (
    <>
    <Navbar />
    <hr></hr>
    <Routes>
      <Route path="/" element={<ExplorePage />} />
      <Route path="/signup" element={<SignUpPage />}/>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/sightings" element={<SightingsPage />} />
    </Routes>
    <Toaster />
    </>
  )
}

export default App