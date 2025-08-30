import React from 'react'
import { useQuery } from 'react-query'
import { lifecycleService } from '../services/api'

const LifecyclePage: React.FC = () => {
  const { data, isLoading, error } = useQuery('lifecycleCatalog', () => 
    lifecycleService.getCatalogEntries({ limit: 50 })
  )

  const bucketColors = {
    NEW: '#4CAF50',
    ACTIVE: '#2196F3', 
    MATURE: '#FF9800',
    LEGACY: '#FF5722',
    EOL: '#9E9E9E',
  }

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading lifecycle data...</div>
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '2rem', color: '#ef4444' }}>Error loading lifecycle data</div>
  }

  return (
    <div>
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
                  Vendor
                </th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>
                  Product
                </th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>
                  Version
                </th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>
                  Release Date
                </th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>
                  End of Support
                </th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>
                  End of Life
                </th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>
                  Lifecycle Bucket
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.entries?.map((entry: any) => (
                <tr key={entry.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '0.75rem', fontWeight: '500', color: '#111827' }}>
                    {entry.vendor}
                  </td>
                  <td style={{ padding: '0.75rem', color: '#6b7280' }}>
                    {entry.product}
                  </td>
                  <td style={{ padding: '0.75rem', color: '#6b7280' }}>
                    {entry.version}
                  </td>
                  <td style={{ padding: '0.75rem', color: '#6b7280', fontSize: '0.875rem' }}>
                    {entry.releaseDate ? new Date(entry.releaseDate).toLocaleDateString() : '-'}
                  </td>
                  <td style={{ padding: '0.75rem', color: '#6b7280', fontSize: '0.875rem' }}>
                    {entry.endOfSupport ? new Date(entry.endOfSupport).toLocaleDateString() : '-'}
                  </td>
                  <td style={{ padding: '0.75rem', color: '#6b7280', fontSize: '0.875rem' }}>
                    {entry.endOfLife ? new Date(entry.endOfLife).toLocaleDateString() : '-'}
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      backgroundColor: bucketColors[entry.bucket as keyof typeof bucketColors] + '20',
                      color: bucketColors[entry.bucket as keyof typeof bucketColors],
                    }}>
                      {entry.bucket}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default LifecyclePage