import React from 'react'
import styled from 'styled-components'

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

const Payroll = () => {
  return (
    <Container>
      <PageHeader>
        <h1>Payroll</h1>
        <p>Manage employee salaries and payroll processing</p>
      </PageHeader>
      
      <Card>
        <h2>Payroll Management</h2>
        <p>Payroll functionality coming soon...</p>
      </Card>
    </Container>
  )
}

export default Payroll
