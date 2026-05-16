import { Link } from 'react-router-dom'

const stats = [
  { label: 'Đề thi đang hoạt động', value: '12' },
  { label: 'Người dùng đã đăng ký', value: '248' },
  { label: 'Điểm trung bình', value: '84%' },
]

export default function AdminDashboard() {
  return (
    <section className="page-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow">Bảng điều khiển admin</p>
          <h1>Tổng quan quản trị hệ thống trắc nghiệm.</h1>
        </div>
        <Link to="/quizzes" className="btn btn-secondary">
          Quản lý đề thi
        </Link>
      </div>

      <div className="card-grid three-col">
        {stats.map((stat) => (
          <article key={stat.label} className="info-card">
            <span className="card-badge">Chỉ số</span>
            <h2>{stat.value}</h2>
            <p>{stat.label}</p>
          </article>
        ))}
      </div>

      <div className="detail-card">
        <h2>Ghi chú admin</h2>
        <p>
          Trang này đang được bảo vệ bằng route guard giả lập để frontend sẵn sàng cho luồng xác
          thực thật sau này.
        </p>
      </div>
    </section>
  )
}