import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { useQuery } from 'react-query'
import authService from '../../services/authService'

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

const Controls = styled.div`
  display: flex;
  gap: var(--spacing-3);
  margin-bottom: var(--spacing-4);
`

const Input = styled.input`
  padding: var(--spacing-3) var(--spacing-4);
  border: 2px solid var(--gray-200);
  border-radius: var(--radius-lg);
`

const Select = styled.select`
  padding: var(--spacing-3) var(--spacing-4);
  border: 2px solid var(--gray-200);
  border-radius: var(--radius-lg);
  background: white;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: var(--font-size-sm);
  th, td { padding: 12px; border-bottom: 1px solid var(--gray-200); text-align: left; }
  th { color: var(--gray-600); font-weight: 600; }
`

const Employees = () => {
  const [search, setSearch] = useState('')
  const [role, setRole] = useState('')

  const { data, isLoading } = useQuery(['users', { search, role }], () => authService.getAllUsers({ search, role }).then(r => r.data))
  const users = useMemo(() => data?.data || data || [], [data])

  return (
    <Container>
      <PageHeader>
        <h1>Employees</h1>
        <p>Manage employee information and records</p>
      </PageHeader>
      
      <Card>
        <Controls>
          <Input placeholder="Search name, email, ID" value={search} onChange={(e) => setSearch(e.target.value)} />
          <Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">All Roles</option>
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
            <option value="super_admin">Super Admin</option>
          </Select>
        </Controls>

        {isLoading ? <p>Loading employees...</p> : (
          <Table>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 && (
                <tr><td colSpan="5" style={{ color: 'var(--gray-500)', padding: '1rem' }}>No users</td></tr>
              )}
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.employeeId}</td>
                  <td>{u.fullName}</td>
                  <td>{u.email}</td>
                  <td style={{ textTransform: 'capitalize' }}>{u.role?.replace('_',' ')}</td>
                  <td>{u.department?.name || '-'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </Container>
  )
}

export default Employees






