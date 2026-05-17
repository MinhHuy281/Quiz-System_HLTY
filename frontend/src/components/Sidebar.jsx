import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Trang chủ', end: true },
  { to: '/quizzes', label: 'Danh sách đề thi' },
  { to: '/result', label: 'Kết quả' },
  { to: '/admin', label: 'Bảng điều khiển admin' },
]

export default function Sidebar({ isOpen, onClose }) {
  return (
    <aside className={`app-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div>
          <p className="eyebrow">Điều hướng</p>
          <h2>Trung tâm học tập</h2>
        </div>
        <button type="button" className="sidebar-close" aria-label="Đóng thanh điều hướng" onClick={onClose}>
          ×
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end} className="sidebar-link" onClick={onClose}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-panel">
        <p className="sidebar-panel-title">Xác thực giả lập</p>
        <p>Các route bảo vệ đang được mô phỏng bằng local storage.</p>
      </div>
    </aside>
  )
}