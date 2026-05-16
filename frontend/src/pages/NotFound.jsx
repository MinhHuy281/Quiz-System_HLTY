import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="auth-page not-found-page">
      <div className="auth-card not-found-card">
        <div className="auth-copy">
          <p className="eyebrow">404</p>
          <h1>Không tìm thấy trang.</h1>
          <p>Route bạn yêu cầu không tồn tại.</p>
        </div>

        <Link to="/" className="btn btn-primary btn-block">
          Về trang chủ
        </Link>
      </div>
    </section>
  )
}