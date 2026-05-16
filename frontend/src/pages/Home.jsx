import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

const features = [
  'Trang chủ công khai và xem danh sách đề thi',
  'Route bảo vệ được mô phỏng',
  'Service axios sẵn sàng cho backend API',
]

export default function Home() {
  const { isAuthenticated, user } = useAuth()

  return (
    <section className="page-shell">
      <div className="hero-card">
        <div className="hero-copy">
          <p className="eyebrow">Nền tảng trắc nghiệm React</p>
          <h1>Khung frontend sẵn sàng cho hệ thống trắc nghiệm production.</h1>
          <p className="hero-text">
            Frontend này đã được cấu hình với React Router, xác thực giả lập, và service axios nối
            theo <code>VITE_API_URL</code>.
          </p>

          <div className="hero-actions">
            <Link to="/quizzes" className="btn btn-primary">
              Xem đề thi
            </Link>
            <Link to={isAuthenticated ? '/admin' : '/login'} className="btn btn-ghost">
              {isAuthenticated ? 'Vào bảng điều khiển' : 'Đăng nhập để tiếp tục'}
            </Link>
          </div>
        </div>

        <div className="hero-panel">
          <div className="panel-stat">
            <strong>{isAuthenticated ? user?.name : 'Khách'}</strong>
            <span>{isAuthenticated ? 'Phiên đã xác thực' : 'Truy cập công khai'}</span>
          </div>

          <div className="panel-list">
            {features.map((feature) => (
              <div key={feature} className="panel-list-item">
                <span className="bullet" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}