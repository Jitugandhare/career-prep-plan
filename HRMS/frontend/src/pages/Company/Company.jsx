import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import companyService from '../../services/companyService'
import { getCompanyProfile } from '../../store/slices/companySlice'

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

const Company = () => {
  const dispatch = useDispatch()
  const { company } = useSelector((state) => state.company)
  const [form, setForm] = useState({ name: '', type: 'main_office', foundedYear: '', employeeCount: '' })

  useEffect(() => { dispatch(getCompanyProfile()) }, [dispatch])
  useEffect(() => {
    if (company) {
      setForm({
        name: company.name || '',
        type: company.type || 'main_office',
        foundedYear: company.foundedYear || '',
        employeeCount: company.employeeCount || ''
      })
    }
  }, [company])

  const onSubmit = async (e) => {
    e.preventDefault()
    await companyService.updateProfile(form)
    dispatch(getCompanyProfile())
  }

  return (
    <Container>
      <PageHeader>
        <h1>Company Management</h1>
        <p>Manage company profile and organizational structure</p>
      </PageHeader>
      
      <Card>
        <h2 style={{ marginBottom: '1rem' }}>Company Profile</h2>
        <form onSubmit={onSubmit}>
          <Row>
            <Col className="md-6">
              <Input placeholder="Company Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </Col>
            <Col className="md-6">
              <Input placeholder="Founded Year" type="number" value={form.foundedYear} onChange={(e) => setForm({ ...form, foundedYear: e.target.value })} />
            </Col>
            <Col className="md-6">
              <Input placeholder="Employee Count" type="number" value={form.employeeCount} onChange={(e) => setForm({ ...form, employeeCount: e.target.value })} />
            </Col>
            <Col>
              <Button type="submit">Save</Button>
            </Col>
          </Row>
        </form>
      </Card>
    </Container>
  )
}

export default Company






