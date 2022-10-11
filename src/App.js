import Login from "./Pages/Users/Login"
import Signup from "./Pages/Users/Signup"
import Home from "./Components/Home"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { UserContextProvider } from "./Helpers/UserContext"
import { ToastContainer } from "react-toastify"
import "./App.css"
import "react-toastify/dist/ReactToastify.css"
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <div className="App">
      <Router>
        <ToastContainer />
        <UserContextProvider>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
          </Routes>
        </UserContextProvider>
      </Router>
    </div>
  )
}

export default App
