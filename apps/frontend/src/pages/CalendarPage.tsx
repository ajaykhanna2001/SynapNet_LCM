import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { calendarService } from '../services/api'
import { EventType } from '@fleetops/shared'

const CalendarPage: React.FC = () => {
  const [eventTypeFilter, setEventTypeFilter] = useState<EventType | ''>('')
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isLoading, error } = useQuery(
    ['events', eventTypeFilter, currentPage],
    () => calendarService.getEvents({
      eventType: eventTypeFilter || undefined,
      page: currentPage,
      limit: 20,
    }),
    { keepPreviousData: true }
  )

  const handleExport = async () => {
    try {
      const blob = await calendarService.exportEvents(eventTypeFilter || undefined)
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'calendar-events.csv'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Export failed:', error)
    }
  }

  const eventTypeColors = {
    MAINTENANCE: '#FF6B35',
    DEPLOYMENT: '#4ECDC4', 
    RETIREMENT: '#95E1D3',
    VULNERABILITY: '#FF5722',
    CONTRACT_RENEWAL: '#2196F3',
    COMPLIANCE: '#9C27B0',
    OTHER: '#607D8B',
  }

  const priorityColors = {
    LOW: '#4CAF50',
    MEDIUM: '#FF9800',
    HIGH: '#FF5722',
    CRITICAL: '#F44336',
  }

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading events...</div>
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '2rem', color: '#ef4444' }}>Error loading events</div>
  }

  return (
    <div>
      {/* Filters and Actions */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        padding: '1.5rem',
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
            Filter by Type:
          </label>
          <select
            value={eventTypeFilter}
            onChange={(e) => {
              setEventTypeFilter(e.target.value as EventType | '')
              setCurrentPage(1)
            }}
            style={{
              padding: '0.5rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
            }}
          >
            <option value="">All Types</option>
            {Object.values(EventType).map((type) => (
              <option key={type} value={type}>
                {type.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={handleExport}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500',
            }}
          >
            📊 Export CSV
          </button>
          <button
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500',
            }}
          >
            ➕ Add Event
          </button>
        </div>
      </div>

      {/* Events Table */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#f9fafb' }}>
              <tr>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>
                  Title
                </th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>
                  Type
                </th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>
                  Priority
                </th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>
                  Start Date
                </th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>
                  End Date
                </th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>
                  Asset/Contract
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.events?.map((event: any) => (
                <tr key={event.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '0.75rem' }}>
                    <div style={{ fontWeight: '500', color: '#111827' }}>
                      {event.title}
                    </div>
                    {event.description && (
                      <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
                        {event.description}
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      backgroundColor: eventTypeColors[event.eventType as keyof typeof eventTypeColors] + '20',
                      color: eventTypeColors[event.eventType as keyof typeof eventTypeColors],
                    }}>
                      {event.eventType.replace('_', ' ')}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      backgroundColor: priorityColors[event.priority as keyof typeof priorityColors] + '20',
                      color: priorityColors[event.priority as keyof typeof priorityColors],
                    }}>
                      {event.priority}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem', color: '#6b7280', fontSize: '0.875rem' }}>
                    {new Date(event.startDate).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '0.75rem', color: '#6b7280', fontSize: '0.875rem' }}>
                    {new Date(event.endDate).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '0.75rem', color: '#6b7280', fontSize: '0.875rem' }}>
                    {event.asset?.name || event.contract?.vendor || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {data?.pagination && (
          <div style={{
            display: 'flex',
            justifyContent: 'between',
            alignItems: 'center',
            padding: '1rem',
            borderTop: '1px solid #e5e7eb',
            backgroundColor: '#f9fafb',
          }}>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              Showing {((currentPage - 1) * 20) + 1} to {Math.min(currentPage * 20, data.pagination.total)} of {data.pagination.total} events
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: currentPage === 1 ? '#f3f4f6' : '#3b82f6',
                  color: currentPage === 1 ? '#9ca3af' : 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  fontSize: '0.875rem',
                }}
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage >= data.pagination.totalPages}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: currentPage >= data.pagination.totalPages ? '#f3f4f6' : '#3b82f6',
                  color: currentPage >= data.pagination.totalPages ? '#9ca3af' : 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: currentPage >= data.pagination.totalPages ? 'not-allowed' : 'pointer',
                  fontSize: '0.875rem',
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CalendarPage