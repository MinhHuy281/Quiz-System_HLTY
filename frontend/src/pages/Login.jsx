import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import FeedbackState from '../components/FeedbackState.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import { useAuth } from '../hooks/useAuth.js'

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const redirectPath = location.state?.from?.pathname || '/admin'

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await login({ name: '', email: formData.email, password: formData.password })
      navigate(redirectPath, { replace: true })
    } catch (loginError) {
      setError(loginError?.message || 'Đăng nhập thất bại. Vui lòng thử lại.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-copy">
          <p className="eyebrow">Chào mừng trở lại</p>
          <h1>Đăng nhập để tiếp tục hành trình làm bài của bạn.</h1>
          <p>Sử dụng luồng xác thực giả lập để mở các trang bảo vệ.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error ? <FeedbackState type="error" title="Lỗi đăng nhập" description={error} /> : null}

          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ban@example.com"
              required
            />
          </label>

          <label>
            Mật khẩu
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </label>

          <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
            {isLoading ? <LoadingSpinner label="Đang đăng nhập..." /> : 'Đăng nhập'}
          </button>

          <p className="auth-switch">
            Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
          </p>
        </form>
      </div>
    </section>
  )
}