import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'
import Sidebar from '../components/Sidebar.jsx'

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div className="app-shell">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <div className="layout-shell">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        {sidebarOpen ? (
          <button
            type="button"
            className="sidebar-backdrop"
            aria-label="Close sidebar"
            onClick={closeSidebar}
          />
        ) : null}
        <main className="app-main">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  )
}