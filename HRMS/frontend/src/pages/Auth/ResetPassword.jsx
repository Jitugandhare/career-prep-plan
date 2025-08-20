import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { resetPassword, reset } from '../../store/slices/authSlice'

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

const ResetPassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useParams()
  const { isLoading, isSuccess, isError, message } = useSelector((state) => state.auth)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  useEffect(() => {
    if (isSuccess) {
      navigate('/login')
    }
    return () => { dispatch(reset()) }
  }, [isSuccess, navigate, dispatch])

  const onSubmit = (e) => {
    e.preventDefault()
    if (!password || password !== confirmPassword) return
    dispatch(resetPassword({ token, password }))
  }

  return (
    <Container>
      <Card>
        <Title>Reset Password</Title>
        <Subtitle>Enter your new password.</Subtitle>
        <Form onSubmit={onSubmit}>
          <Input type="password" placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Input type="password" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          {isError && message && <ErrorText>{message}</ErrorText>}
          <Button type="submit" disabled={isLoading}>{isLoading ? 'Resetting...' : 'Reset Password'}</Button>
        </Form>
      </Card>
    </Container>
  )
}

export default ResetPassword


