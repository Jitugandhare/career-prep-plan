import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { FiMail, FiLock, FiEye, FiEyeOff, FiBriefcase } from 'react-icons/fi'
import { login, reset } from '../../store/slices/authSlice'

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary-50) 0%, var(--primary-100) 100%);
  padding: var(--spacing-4);
`

const LoginCard = styled.div`
  background: white;
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-xl);
  padding: var(--spacing-8);
  width: 100%;
  max-width: 400px;
  text-align: center;
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-3);
  margin-bottom: var(--spacing-8);
  
  .logo-icon {
    width: 48px;
    height: 48px;
    background: var(--primary-500);
    border-radius: var(--radius-xl);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
  
  h1 {
    font-size: var(--font-size-3xl);
    font-weight: 700;
    color: var(--gray-900);
    margin: 0;
  }
`

const WelcomeText = styled.p`
  color: var(--gray-600);
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-8);
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
`

const FormGroup = styled.div`
  text-align: left;
`

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: var(--gray-700);
  margin-bottom: var(--spacing-2);
  font-size: var(--font-size-sm);
`

const InputContainer = styled.div`
  position: relative;
`

const Input = styled.input`
  width: 100%;
  padding: var(--spacing-3) var(--spacing-4);
  padding-left: var(--spacing-10);
  border: 2px solid var(--gray-200);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  transition: all var(--transition-fast);
  
  &:focus {
    outline: none;
    border-color: var(--primary-500);
    box-shadow: 0 0 0 3px rgb(59 130 246 / 0.1);
  }
  
  &.error {
    border-color: var(--error-500);
  }
`

const InputIcon = styled.div`
  position: absolute;
  left: var(--spacing-3);
  top: 50%;
  transform: translateY(-50%);
  color: var(--gray-400);
  width: 20px;
  height: 20px;
`

const PasswordToggle = styled.button`
  position: absolute;
  right: var(--spacing-3);
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--gray-400);
  cursor: pointer;
  padding: var(--spacing-1);
  border-radius: var(--radius-md);
  transition: color var(--transition-fast);
  
  &:hover {
    color: var(--gray-600);
  }
`

const ErrorMessage = styled.span`
  color: var(--error-600);
  font-size: var(--font-size-sm);
  margin-top: var(--spacing-1);
  display: block;
`

const SubmitButton = styled.button`
  background: var(--primary-600);
  color: white;
  border: none;
  padding: var(--spacing-3) var(--spacing-6);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  margin-top: var(--spacing-4);
  
  &:hover:not(:disabled) {
    background: var(--primary-700);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }
  
  &:disabled {
    background: var(--gray-400);
    cursor: not-allowed;
    transform: none;
  }
`

const ForgotPasswordLink = styled(Link)`
  color: var(--primary-600);
  text-decoration: none;
  font-size: var(--font-size-sm);
  font-weight: 500;
  transition: color var(--transition-fast);
  
  &:hover {
    color: var(--primary-700);
  }
`

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: var(--spacing-6) 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--gray-200);
  }
  
  span {
    padding: 0 var(--spacing-4);
    color: var(--gray-500);
    font-size: var(--font-size-sm);
  }
`

const RegisterLink = styled(Link)`
  color: var(--gray-600);
  text-decoration: none;
  font-size: var(--font-size-sm);
  
  &:hover {
    color: var(--gray-800);
  }
  
  strong {
    color: var(--primary-600);
    font-weight: 600;
  }
`

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, isSuccess, isError, message } = useSelector((state) => state.auth)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (isSuccess) {
      navigate('/dashboard')
    }
    return () => {
      dispatch(reset())
    }
  }, [isSuccess, navigate, dispatch])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(login({ email, password }))
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <LoginContainer>
      <LoginCard>
        <Logo>
          <div className="logo-icon">
            <FiBriefcase />
          </div>
          <h1>HRMS</h1>
        </Logo>

        <WelcomeText>Welcome back! Please sign in to your account.</WelcomeText>

        <Form onSubmit={onSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <InputContainer>
              <InputIcon>
                <FiMail />
              </InputIcon>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputContainer>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <InputContainer>
              <InputIcon>
                <FiLock />
              </InputIcon>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <PasswordToggle
                type="button"
                onClick={togglePasswordVisibility}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </PasswordToggle>
            </InputContainer>
          </FormGroup>

          {isError && <ErrorMessage style={{ textAlign: 'center' }}>{message}</ErrorMessage>}

          <ForgotPasswordLink to="/forgot-password">
            Forgot your password?
          </ForgotPasswordLink>

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </SubmitButton>
        </Form>

        {/* Registration is restricted to Super Admins within the app. Public sign-up is disabled. */}
      </LoginCard>
    </LoginContainer>
  )
}

export default Login


