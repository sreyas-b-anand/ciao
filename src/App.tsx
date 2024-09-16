import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Profile from "./pages/Profile"
import History from "./pages/History"
import Chat from "./pages/Chat"
import Landing from "./firebase/auth/Landing"
import Register from "./firebase/auth/user/Register"


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/" element={<Landing/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/chat" element={<Chat/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/history" element={<History/>}/>
        </Routes>
      
      </BrowserRouter>
    </>
  )
}

export default App
