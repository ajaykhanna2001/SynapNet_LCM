import React from 'react'
import { useQuery } from 'react-query'
import { calendarService, contractsService, assetsService } from '../services/api'

const DashboardPage: React.FC = () => {
  const { data: eventsData } = useQuery('events', () => 
    calendarService.getEvents({ limit: 5 })
  )
  const { data: contractsData } = useQuery('contracts', () => 
    contractsService.getContracts({ limit: 5 })
  )
  const { data: assetsData } = useQuery('assets', () => 
    assetsService.getAssets({ limit: 5 })
  )

  const cardStyle = {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb',
  }

  const metricCardStyle = {
    ...cardStyle,
    textAlign: 'center' as const,
  }

  return (
    <div>
      {/* KPI Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem',
      }}>
        <div style={metricCardStyle}>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#3b82f6', marginBottom: '0.5rem' }}>
            {eventsData?.pagination?.total || 0}
          </div>
          <div style={{ color: '#6b7280', fontSize: '1rem' }}>Total Events</div>
        </div>

        <div style={metricCardStyle}>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#10b981', marginBottom: '0.5rem' }}>
            {contractsData?.pagination?.total || 0}
          </div>
          <div style={{ color: '#6b7280', fontSize: '1rem' }}>Active Contracts</div>
        </div>

        <div style={metricCardStyle}>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#f59e0b', marginBottom: '0.5rem' }}>
            {assetsData?.pagination?.total || 0}
          </div>
          <div style={{ color: '#6b7280', fontSize: '1rem' }}>Total Assets</div>
        </div>

        <div style={metricCardStyle}>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ef4444', marginBottom: '0.5rem' }}>
            3
          </div>
          <div style={{ color: '#6b7280', fontSize: '1rem' }}>Critical Alerts</div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
      }}>
        {/* Recent Events */}
        <div style={cardStyle}>
          <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem', fontWeight: '600', color: '#111827' }}>
            Recent Events
          </h2>
          <div>
            {eventsData?.events?.slice(0, 5).map((event: any) => (
              <div key={event.id} style={{
                padding: '0.75rem 0',
                borderBottom: '1px solid #f3f4f6',
              }}>
                <div style={{ fontWeight: '500', color: '#111827', marginBottom: '0.25rem' }}>
                  {event.title}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  {new Date(event.startDate).toLocaleDateString()} - {event.eventType}
                </div>
              </div>
            )) || (
              <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                No recent events
              </div>
            )}
          </div>
        </div>

        {/* AI Insights */}
        <div style={cardStyle}>
          <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem', fontWeight: '600', color: '#111827' }}>
            AI Insights (Preview)
          </h2>
          <div>
            <div style={{
              padding: '1rem',
              backgroundColor: '#f0f9ff',
              border: '1px solid #bae6fd',
              borderRadius: '0.375rem',
              marginBottom: '1rem',
            }}>
              <div style={{ fontWeight: '500', color: '#0369a1', marginBottom: '0.5rem' }}>
                🤖 Contract Optimization
              </div>
              <div style={{ fontSize: '0.875rem', color: '#0c4a6e' }}>
                3 contracts are approaching renewal. Consider consolidating vendors to reduce costs by ~15%.
              </div>
            </div>

            <div style={{
              padding: '1rem',
              backgroundColor: '#fef3c7',
              border: '1px solid #fbbf24',
              borderRadius: '0.375rem',
              marginBottom: '1rem',
            }}>
              <div style={{ fontWeight: '500', color: '#92400e', marginBottom: '0.5rem' }}>
                ⚠️ Risk Assessment
              </div>
              <div style={{ fontSize: '0.875rem', color: '#78350f' }}>
                2 legacy systems detected with high vulnerability scores. Schedule updates within 30 days.
              </div>
            </div>

            <div style={{
              padding: '1rem',
              backgroundColor: '#f0fdf4',
              border: '1px solid #86efac',
              borderRadius: '0.375rem',
            }}>
              <div style={{ fontWeight: '500', color: '#166534', marginBottom: '0.5rem' }}>
                ✅ Lifecycle Optimization
              </div>
              <div style={{ fontSize: '0.875rem', color: '#14532d' }}>
                Asset lifecycle distribution is healthy. 85% of assets are in active/mature buckets.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ ...cardStyle, marginTop: '2rem' }}>
        <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem', fontWeight: '600', color: '#111827' }}>
          Quick Actions
        </h2>
        <div style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap' as const,
        }}>
          <button style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500',
          }}>
            Create Event
          </button>
          <button style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500',
          }}>
            Import Assets
          </button>
          <button style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#f59e0b',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500',
          }}>
            Run Vulnerability Scan
          </button>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage