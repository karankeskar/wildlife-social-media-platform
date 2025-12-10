import {Route, Routes} from "react-router-dom";
import SignUpPage from "./pages/SignUpPage"
import Navbar from "./pages/Navbar";
import LoginPage from "./pages/LoginPage";
function App() {
  return (
    <>
    <Navbar />
    <hr></hr>
    <Routes>
      <Route path="/signup" element={<SignUpPage />}/>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
    </>
  )
}

export default App