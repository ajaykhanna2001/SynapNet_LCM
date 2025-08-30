import React from 'react'
import { useQuery } from 'react-query'

import { contractsService } from '../services/api'

const ContractsPage: React.FC = () => {
  const { data, isLoading, error } = useQuery('contracts', () => 
    contractsService.getContracts({ limit: 50 })
  )

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading contracts...</div>
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '2rem', color: '#ef4444' }}>Error loading contracts</div>
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
                  Contract Number
                </th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>
                  Value
                </th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>
                  Start Date
                </th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>
                  End Date
                </th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.contracts?.map((contract: any) => (
                <tr key={contract.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '0.75rem', fontWeight: '500', color: '#111827' }}>
                    {contract.vendor}
                  </td>
                  <td style={{ padding: '0.75rem', color: '#6b7280' }}>
                    {contract.contractNumber}
                  </td>
                  <td style={{ padding: '0.75rem', color: '#6b7280' }}>
                    ${contract.value.toLocaleString()}
                  </td>
                  <td style={{ padding: '0.75rem', color: '#6b7280', fontSize: '0.875rem' }}>
                    {new Date(contract.startDate).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '0.75rem', color: '#6b7280', fontSize: '0.875rem' }}>
                    {new Date(contract.endDate).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      backgroundColor: contract.status === 'ACTIVE' ? '#dcfce7' : '#fef2f2',
                      color: contract.status === 'ACTIVE' ? '#16a34a' : '#dc2626',
                    }}>
                      {contract.status}
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

export default ContractsPage