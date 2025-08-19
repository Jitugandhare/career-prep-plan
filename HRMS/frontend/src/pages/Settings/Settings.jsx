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

const Settings = () => {
  return (
    <Container>
      <PageHeader>
        <h1>Settings</h1>
        <p>Configure system preferences and user settings</p>
      </PageHeader>
      
      <Card>
        <h2>System Settings</h2>
        <p>Settings functionality coming soon...</p>
      </Card>
    </Container>
  )
}

export default Settings
