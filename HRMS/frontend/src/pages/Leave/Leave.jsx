import React, { useState } from 'react'
import styled from 'styled-components'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import leaveService from '../../services/leaveService'

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

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-6);
`

const Field = styled.div`
  grid-column: span 12;
  @media (min-width: 768px) {
    &.md-4 { grid-column: span 4; }
    &.md-6 { grid-column: span 6; }
  }
`

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: var(--gray-700);
  margin-bottom: var(--spacing-2);
  font-size: var(--font-size-sm);
`

const Input = styled.input`
  width: 100%;
  padding: var(--spacing-3) var(--spacing-4);
  border: 2px solid var(--gray-200);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  &:focus { outline: none; border-color: var(--primary-500); box-shadow: 0 0 0 3px rgb(59 130 246 / 0.1); }
`

const Select = styled.select`
  width: 100%;
  padding: var(--spacing-3) var(--spacing-4);
  border: 2px solid var(--gray-200);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  background: white;
  &:focus { outline: none; border-color: var(--primary-500); box-shadow: 0 0 0 3px rgb(59 130 246 / 0.1); }
`

const Textarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: var(--spacing-3) var(--spacing-4);
  border: 2px solid var(--gray-200);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  &:focus { outline: none; border-color: var(--primary-500); box-shadow: 0 0 0 3px rgb(59 130 246 / 0.1); }
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

const Leave = () => {
  const queryClient = useQueryClient()
  const [form, setForm] = useState({ type: 'annual', startDate: '', endDate: '', reason: '' })

  const balanceQuery = useQuery(['leave', 'balance'], () => leaveService.getMyBalance().then(r => r.data))
  const requestsQuery = useQuery(['leave', 'myRequests'], () => leaveService.getMyRequests().then(r => r.data))

  const requestMutation = useMutation((payload) => leaveService.requestLeave(payload).then(r => r.data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['leave', 'myRequests'])
      queryClient.invalidateQueries(['leave', 'balance'])
      setForm({ type: 'annual', startDate: '', endDate: '', reason: '' })
    }
  })

  const cancelMutation = useMutation((id) => leaveService.cancelMyRequest(id).then(r => r.data), {
    onSuccess: () => queryClient.invalidateQueries(['leave', 'myRequests'])
  })

  const onSubmit = (e) => {
    e.preventDefault()
    if (!form.startDate || !form.endDate) return
    requestMutation.mutate(form)
  }

  const requests = requestsQuery.data?.data || requestsQuery.data || []
  const balance = balanceQuery.data?.data || balanceQuery.data || {}

  return (
    <Container>
      <PageHeader>
        <h1>Leave Management</h1>
        <p>Manage employee leave requests and approvals</p>
      </PageHeader>
      
      <Card>
        <h2 style={{ marginBottom: '1rem' }}>Request Leave</h2>
        <Form onSubmit={onSubmit}>
          <Field className="md-4">
            <Label>Type</Label>
            <Select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <option value="annual">Annual</option>
              <option value="sick">Sick</option>
              <option value="casual">Casual</option>
              <option value="unpaid">Unpaid</option>
            </Select>
          </Field>
          <Field className="md-4">
            <Label>Start Date</Label>
            <Input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
          </Field>
          <Field className="md-4">
            <Label>End Date</Label>
            <Input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
          </Field>
          <Field>
            <Label>Reason</Label>
            <Textarea value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} placeholder="Optional" />
          </Field>
          <Field>
            <Button type="submit" disabled={requestMutation.isLoading}>{requestMutation.isLoading ? 'Submitting...' : 'Submit Request'}</Button>
          </Field>
        </Form>

        <div style={{ marginBottom: '1.5rem', color: 'var(--gray-600)' }}>
          <strong>Leave Balance:</strong> {balance?.annual ?? '-'} days annual, {balance?.sick ?? '-'} days sick
        </div>

        <h3 style={{ marginBottom: '0.75rem' }}>My Requests</h3>
        {requestsQuery.isLoading ? (
          <p>Loading requests...</p>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Period</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 && (
                <tr><td colSpan="4" style={{ color: 'var(--gray-500)', padding: '1rem' }}>No requests</td></tr>
              )}
              {requests.map((r) => (
                <tr key={r._id}>
                  <td style={{ textTransform: 'capitalize' }}>{r.type || '-'}</td>
                  <td>{r.startDate && r.endDate ? `${new Date(r.startDate).toLocaleDateString()} - ${new Date(r.endDate).toLocaleDateString()}` : '-'}</td>
                  <td style={{ textTransform: 'capitalize' }}>{r.status || '-'}</td>
                  <td>
                    {r.status === 'pending' ? (
                      <Button style={{ background: 'var(--error-600)' }} onClick={() => cancelMutation.mutate(r._id)} disabled={cancelMutation.isLoading}>Cancel</Button>
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </Container>
  )
}

export default Leave






