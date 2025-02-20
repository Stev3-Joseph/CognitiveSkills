import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import StartTest from "./pages/StartTest";
import SectionPage from "./pages/SectionPage";
import QuestionPage from "./pages/QuestionPage";
import Register from './pages/Register'
import Login from './pages/Login'
import About from './pages/About'
import NotFound from './pages/NotFound'
import FinishTest from './pages/FinishTest'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<StartTest />} />
        <Route path="/test/section/:sectionName" element={<SectionPage />} />
        <Route path="/test/section/:sectionName/question/:qNumber" element={<QuestionPage />} />
        <Route path="/test/finish" element={<FinishTest/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App;
