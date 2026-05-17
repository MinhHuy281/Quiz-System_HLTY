import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import FeedbackState from '../components/FeedbackState.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import { useAuth } from '../hooks/useAuth.js'

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { register } = useAuth()
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
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
      navigate(redirectPath, { replace: true })
    } catch (registerError) {
      setError(registerError?.message || 'Đăng ký thất bại. Vui lòng thử lại.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-copy">
          <p className="eyebrow">Tạo tài khoản</p>
          <h1>Đăng ký một tài khoản học viên demo.</h1>
          <p>Ứng dụng lưu phiên này vào local storage để mô phỏng truy cập bảo vệ.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error ? (
            <FeedbackState type="error" title="Lỗi đăng ký" description={error} />
          ) : null}

          <label>
            Họ và tên
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nguyễn Văn A"
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
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
            {isLoading ? <LoadingSpinner label="Đang tạo tài khoản..." /> : 'Đăng ký'}
          </button>

          <p className="auth-switch">
            Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </p>
        </form>
      </div>
    </section>
  )
}