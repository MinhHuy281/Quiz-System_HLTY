import { Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout.jsx'
import AdminDashboard from '../pages/AdminDashboard.jsx'
import Home from '../pages/Home.jsx'
import Login from '../pages/Login.jsx'
import NotFound from '../pages/NotFound.jsx'
import QuizDetail from '../pages/QuizDetail.jsx'
import QuizList from '../pages/QuizList.jsx'
import Register from '../pages/Register.jsx'
import Result from '../pages/Result.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import PublicRoute from './PublicRoute.jsx'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="quizzes" element={<QuizList />} />
        <Route element={<ProtectedRoute />}>
          <Route path="quiz/:quizId" element={<QuizDetail />} />
          <Route path="result" element={<Result />} />
          <Route path="admin" element={<AdminDashboard />} />
        </Route>
      </Route>

      <Route element={<PublicRoute />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}