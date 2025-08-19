import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary-50) 0%, var(--primary-100) 100%);
  padding: var(--spacing-4);
`

const Card = styled.div`
  background: white;
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-xl);
  padding: var(--spacing-8);
  width: 100%;
  max-width: 400px;
  text-align: center;
`

const Register = () => {
  return (
    <Container>
      <Card>
        <h1>Register Page</h1>
        <p>Registration functionality coming soon...</p>
      </Card>
    </Container>
  )
}

export default Register
