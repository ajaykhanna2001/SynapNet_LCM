import React, { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth()
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Calendar', href: '/calendar', icon: '📅' },
    { name: 'Contracts', href: '/contracts', icon: '📄' },
    { name: 'Lifecycle', href: '/lifecycle', icon: '🔄' },
    { name: 'Settings', href: '/settings', icon: '⚙️' },
  ]

  return (
    <div style={{ minHeight: '100vh', display: 'flex' }}>
      {/* Sidebar */}
      <div style={{
        width: '250px',
        backgroundColor: '#1f2937',
        color: 'white',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
            🚢 FleetOps Calendar
          </h1>
        </div>

        <nav style={{ flex: 1 }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {navigation.map((item) => (
              <li key={item.name} style={{ marginBottom: '0.5rem' }}>
                <Link
                  to={item.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.75rem',
                    borderRadius: '0.375rem',
                    textDecoration: 'none',
                    color: location.pathname === item.href ? '#3b82f6' : '#d1d5db',
                    backgroundColor: location.pathname === item.href ? '#374151' : 'transparent',
                    transition: 'all 0.2s',
                  }}
                >
                  <span style={{ marginRight: '0.75rem', fontSize: '1.2rem' }}>
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div style={{
          borderTop: '1px solid #374151',
          paddingTop: '1rem',
          marginTop: '1rem',
        }}>
          <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#9ca3af' }}>
            {user?.firstName} {user?.lastName}
          </div>
          <div style={{ marginBottom: '0.5rem', fontSize: '0.75rem', color: '#6b7280' }}>
            {user?.email}
          </div>
          <button
            onClick={logout}
            style={{
              width: '100%',
              padding: '0.5rem',
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{
          backgroundColor: 'white',
          borderBottom: '1px solid #e5e7eb',
          padding: '1rem 2rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        }}>
          <h1 style={{ margin: 0, fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>
            {navigation.find(item => item.href === location.pathname)?.name || 'FleetOps Calendar'}
          </h1>
        </header>

        <main style={{
          flex: 1,
          padding: '2rem',
          backgroundColor: '#f9fafb',
          overflow: 'auto',
        }}>
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout