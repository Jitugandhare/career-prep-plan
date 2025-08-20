import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword, reset } from '../../store/slices/authSlice'

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

const Title = styled.h1`
  margin-bottom: var(--spacing-2);
  color: var(--gray-900);
`

const Subtitle = styled.p`
  margin-bottom: var(--spacing-6);
  color: var(--gray-600);
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
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
  font-size: var(--font-size-base);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  &:hover:not(:disabled) { background: var(--primary-700); transform: translateY(-1px); box-shadow: var(--shadow-md); }
  &:disabled { background: var(--gray-400); cursor: not-allowed; transform: none; }
`

const ErrorText = styled.span`
  color: var(--error-600);
  font-size: var(--font-size-sm);
`

const SuccessText = styled.span`
  color: var(--success-600);
  font-size: var(--font-size-sm);
`

const ForgotPassword = () => {
  const dispatch = useDispatch()
  const { isLoading, isSuccess, isError, message } = useSelector((state) => state.auth)
  const [email, setEmail] = useState('')

  useEffect(() => {
    return () => { dispatch(reset()) }
  }, [dispatch])

  const onSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    dispatch(forgotPassword(email))
  }

  return (
    <Container>
      <Card>
        <Title>Forgot Password</Title>
        <Subtitle>Enter your email to receive a password reset link.</Subtitle>
        <Form onSubmit={onSubmit}>
          <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          {isError && message && <ErrorText>{message}</ErrorText>}
          {isSuccess && <SuccessText>Please check your email for the reset link.</SuccessText>}
          <Button type="submit" disabled={isLoading}>{isLoading ? 'Sending...' : 'Send Reset Link'}</Button>
        </Form>
      </Card>
    </Container>
  )
}

export default ForgotPassword






