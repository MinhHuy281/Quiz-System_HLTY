import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

export default function Navbar({ onMenuClick }) {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/', { replace: true })
  }

  return (
    <header className="app-navbar">
      <div className="navbar-inner">
        <div className="navbar-brand-wrap">
          <button
            type="button"
            className="navbar-toggle"
            aria-label="Mở thanh điều hướng"
            onClick={onMenuClick}
          >
            <span />
            <span />
            <span />
          </button>
          <Link to="/" className="navbar-brand">
            <span className="brand-mark">Q</span>
            <span>
              <strong>Hệ Thống Trắc Nghiệm</strong>
              <small>Frontend React + Vite</small>
            </span>
          </Link>
        </div>

        <div className="navbar-actions">
          {isAuthenticated ? (
            <>
              <span className="navbar-chip">Xin chào, {user?.name}</span>
              <button type="button" className="btn btn-secondary" onClick={() => void handleLogout()}>
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost">
                Đăng nhập
              </Link>
              <Link to="/register" className="btn btn-primary">
                Đăng ký
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}