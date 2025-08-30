import React, { useState } from 'react'

interface Setting {
  key: string;
  value: string;
  description?: string;
  category: string;
}

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<Setting[]>([
    {
      key: 'smtp_host',
      value: 'smtp.company.com',
      description: 'SMTP server hostname for email notifications',
      category: 'NOTIFICATIONS',
    },
    {
      key: 'contract_renewal_notice_days',
      value: '90',
      description: 'Days before contract expiry to send renewal notice',
      category: 'GENERAL',
    },
    {
      key: 'vulnerability_scan_frequency',
      value: 'daily',
      description: 'Frequency of vulnerability scans',
      category: 'GENERAL',
    },
    {
      key: 'ai_insights_enabled',
      value: 'true',
      description: 'Enable AI-powered insights and recommendations',
      category: 'AI',
    },
  ])

  const [editingKey, setEditingKey] = useState<string>('')
  const [editingValue, setEditingValue] = useState<string>('')

  const handleEdit = (setting: Setting) => {
    setEditingKey(setting.key)
    setEditingValue(setting.value)
  }

  const handleSave = (key: string) => {
    setSettings(prev => prev.map(setting => 
      setting.key === key ? { ...setting, value: editingValue } : setting
    ))
    setEditingKey('')
    setEditingValue('')
  }

  const handleCancel = () => {
    setEditingKey('')
    setEditingValue('')
  }

  const categories = [...new Set(settings.map(s => s.category))]

  return (
    <div>
      {categories.map(category => (
        <div key={category} style={{
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          marginBottom: '2rem',
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '1rem',
            backgroundColor: '#f9fafb',
            borderBottom: '1px solid #e5e7eb',
          }}>
            <h2 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>
              {category.replace('_', ' ')} Settings
            </h2>
          </div>

          <div style={{ padding: '1rem' }}>
            {settings
              .filter(setting => setting.category === category)
              .map(setting => (
                <div key={setting.key} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem 0',
                  borderBottom: '1px solid #f3f4f6',
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '500', color: '#111827', marginBottom: '0.25rem' }}>
                      {setting.key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </div>
                    {setting.description && (
                      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        {setting.description}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {editingKey === setting.key ? (
                      <>
                        <input
                          type="text"
                          value={editingValue}
                          onChange={(e) => setEditingValue(e.target.value)}
                          style={{
                            padding: '0.5rem',
                            border: '1px solid #d1d5db',
                            borderRadius: '0.375rem',
                            fontSize: '0.875rem',
                            minWidth: '200px',
                          }}
                        />
                        <button
                          onClick={() => handleSave(setting.key)}
                          style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#10b981',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.375rem',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                          }}
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#6b7280',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.375rem',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                          }}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <span style={{
                          minWidth: '200px',
                          padding: '0.5rem',
                          backgroundColor: '#f9fafb',
                          border: '1px solid #e5e7eb',
                          borderRadius: '0.375rem',
                          fontSize: '0.875rem',
                          display: 'inline-block',
                        }}>
                          {setting.value}
                        </span>
                        <button
                          onClick={() => handleEdit(setting)}
                          style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.375rem',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                          }}
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}

      <div style={{
        backgroundColor: '#fef3c7',
        border: '1px solid #fbbf24',
        borderRadius: '0.5rem',
        padding: '1rem',
        marginTop: '2rem',
      }}>
        <div style={{ fontWeight: '500', color: '#92400e', marginBottom: '0.5rem' }}>
          ⚠️ Note
        </div>
        <div style={{ fontSize: '0.875rem', color: '#78350f' }}>
          Settings changes are saved immediately. Some changes may require a system restart to take effect.
        </div>
      </div>
    </div>
  )
}

export default SettingsPage