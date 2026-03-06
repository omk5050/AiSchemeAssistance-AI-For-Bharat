import { BrowserRouter, Routes, Route } from "react-router-dom"

import TopBar from "./components/TopBar"
import Navbar from "./components/Navbar"

import Home from "./pages/Home"
import Checker from "./pages/Checker"

function App() {
  return (
    <BrowserRouter>

      <TopBar />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checker" element={<Checker />} />
        {/* Future routes for Schemes and About can be added here */}
      </Routes>

    </BrowserRouter>
  )
}

export default App