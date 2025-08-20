import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import attendanceService from '../../services/attendanceService'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const PageHeader = styled.div`
  margin-bottom: var(--spacing-8);
  
  h1 {
    color: var(--gray-900);
    margin-bottom: var(--spacing-2);
  }
  
  p {
    color: var(--gray-600);
    font-size: var(--font-size-lg);
  }
`

const Card = styled.div`
  background: white;
  border-radius: var(--radius-xl);
  padding: var(--spacing-6);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--gray-200);
`

const Actions = styled.div`
  display: flex;
  gap: var(--spacing-3);
  margin-bottom: var(--spacing-4);
`

const Button = styled.button`
  background: var(--primary-600);
  color: white;
  border: none;
  padding: var(--spacing-3) var(--spacing-6);
  border-radius: var(--radius-lg);
  font-weight: 600;
  cursor: pointer;
  &:disabled { background: var(--gray-400); cursor: not-allowed; }
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: var(--font-size-sm);
  th, td { padding: 12px; border-bottom: 1px solid var(--gray-200); text-align: left; }
  th { color: var(--gray-600); font-weight: 600; }
`

const Attendance = () => {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery(['attendance', 'me'], () => attendanceService.getMyAttendance().then(r => r.data))

  const clockInMutation = useMutation(() => attendanceService.clockIn().then(r => r.data), {
    onSuccess: () => queryClient.invalidateQueries(['attendance', 'me'])
  })
  const clockOutMutation = useMutation(() => attendanceService.clockOut().then(r => r.data), {
    onSuccess: () => queryClient.invalidateQueries(['attendance', 'me'])
  })

  const records = useMemo(() => data?.data || data || [], [data])

  return (
    <Container>
      <PageHeader>
        <h1>Attendance</h1>
        <p>Track employee attendance and time records</p>
      </PageHeader>
      <Card>
        <h2 style={{ marginBottom: '1rem' }}>My Attendance</h2>
        <Actions>
          <Button onClick={() => clockInMutation.mutate()} disabled={clockInMutation.isLoading}> {clockInMutation.isLoading ? 'Clocking In...' : 'Clock In'} </Button>
          <Button onClick={() => clockOutMutation.mutate()} disabled={clockOutMutation.isLoading}> {clockOutMutation.isLoading ? 'Clocking Out...' : 'Clock Out'} </Button>
        </Actions>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Clock In</th>
                <th>Clock Out</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {records.length === 0 && (
                <tr><td colSpan="4" style={{ color: 'var(--gray-500)', padding: '1rem' }}>No records</td></tr>
              )}
              {records.map((r) => (
                <tr key={r._id || `${r.date}-${r.clockIn}`}>
                  <td>{r.date ? new Date(r.date).toLocaleDateString() : '-'}</td>
                  <td>{r.clockIn ? new Date(r.clockIn).toLocaleTimeString() : '-'}</td>
                  <td>{r.clockOut ? new Date(r.clockOut).toLocaleTimeString() : '-'}</td>
                  <td>{r.status || '-'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </Container>
  )
}

export default Attendance


