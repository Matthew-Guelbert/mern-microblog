import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ExplorePage from "./pages/ExplorePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import ProfilePage from "./pages/ProfilePage"
import "./App.css"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/expore/people" element={<ExplorePage initialTab="people" />} />
      <Route path="/tag/:tagName" element={<ExplorePage initialTab="topics" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/:username" element={<ProfilePage />} />
      {/* Add more routes as needed */}
    </Routes>
  )
}

export default App
