import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { updateDetails, getMe } from '../../store/slices/authSlice'

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

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--spacing-4);
`

const Col = styled.div`
  grid-column: span 12;
  @media (min-width: 768px) { &.md-6 { grid-column: span 6; } }
`

const Input = styled.input`
  width: 100%;
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
`

const Profile = () => {
  const dispatch = useDispatch()
  const { user, isLoading } = useSelector((state) => state.auth)
  const [form, setForm] = useState({ fullName: '', contactNumber: '' })

  useEffect(() => { if (!user) dispatch(getMe()) }, [user, dispatch])
  useEffect(() => {
    if (user) setForm({ fullName: user.fullName || '', contactNumber: user.contactNumber || '' })
  }, [user])

  const onSubmit = async (e) => {
    e.preventDefault()
    await dispatch(updateDetails(form))
    dispatch(getMe())
  }

  return (
    <Container>
      <PageHeader>
        <h1>Profile</h1>
        <p>Manage your personal information and settings</p>
      </PageHeader>
      
      <Card>
        <h2 style={{ marginBottom: '1rem' }}>My Details</h2>
        <form onSubmit={onSubmit}>
          <Row>
            <Col className="md-6">
              <Input placeholder="Full Name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
            </Col>
            <Col className="md-6">
              <Input placeholder="Contact Number" value={form.contactNumber} onChange={(e) => setForm({ ...form, contactNumber: e.target.value })} />
            </Col>
            <Col>
              <Button type="submit" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save Changes'}</Button>
            </Col>
          </Row>
        </form>
      </Card>
    </Container>
  )
}

export default Profile






