import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { setTheme, toggleTheme } from '../../store/slices/uiSlice'

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

const Button = styled.button`
  background: var(--primary-600);
  color: white;
  border: none;
  padding: var(--spacing-3) var(--spacing-6);
  border-radius: var(--radius-lg);
  font-weight: 600;
  cursor: pointer;
`

const Select = styled.select`
  padding: var(--spacing-3) var(--spacing-4);
  border: 2px solid var(--gray-200);
  border-radius: var(--radius-lg);
  background: white;
`

const Settings = () => {
  const dispatch = useDispatch()
  const { theme } = useSelector((state) => state.ui)

  const applyTheme = (value) => {
    dispatch(setTheme(value))
    try { document.documentElement.setAttribute('data-theme', value) } catch (_) {}
  }

  return (
    <Container>
      <PageHeader>
        <h1>Settings</h1>
        <p>Configure system preferences and user settings</p>
      </PageHeader>
      
      <Card>
        <h2 style={{ marginBottom: '1rem' }}>Appearance</h2>
        <Row>
          <Col className="md-6">
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--gray-600)' }}>Theme</label>
            <Select value={theme} onChange={(e) => applyTheme(e.target.value)}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </Select>
          </Col>
          <Col className="md-6" style={{ display: 'flex', alignItems: 'flex-end' }}>
            <Button type="button" onClick={() => applyTheme(theme === 'dark' ? 'light' : 'dark')}>Toggle Theme</Button>
          </Col>
        </Row>
      </Card>
    </Container>
  )
}

export default Settings






