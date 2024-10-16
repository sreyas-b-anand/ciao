import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import History from "./pages/chats/History";
import Landing from "./firebase/auth/user/Landing";
import Register from "./firebase/auth/user/Register";
import ChatInterface from "./pages/chats/Chat";
import Tasker from "./pages/tasks/Tasker";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <>
      <BrowserRouter>
    
      
   

        {/* Main content area */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/user" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat" element={<ChatInterface />} />
          <Route path="/history" element={<History />} />
          <Route path="/your-tasks" element={<Tasker />} />
       
          <Route path="*" element={<NotFound />} />
        </Routes>
      
    </BrowserRouter>
    </>
  );
};

export default App;
