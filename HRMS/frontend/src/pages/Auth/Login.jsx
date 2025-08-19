import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { login, reset } from '../../store/slices/authSlice'
import styled from 'styled-components'
import { FiMail, FiLock, FiEye, FiEyeOff, FiBuilding } from 'react-icons/fi'

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
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (isSuccess) {
      navigate('/dashboard')
    }
    
    return () => {
      dispatch(reset())
    }
  }, [isSuccess, navigate, dispatch])

  const onSubmit = (data) => {
    dispatch(login(data))
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <LoginContainer>
      <LoginCard>
        <Logo>
          <div className="logo-icon">
            <FiBuilding />
          </div>
          <h1>HRMS</h1>
        </Logo>
        
        <WelcomeText>Welcome back! Please sign in to your account.</WelcomeText>
        
        <Form onSubmit={handleSubmit(onSubmit)}>
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
                className={errors.email ? 'error' : ''}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />
            </InputContainer>
            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
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
                className={errors.password ? 'error' : ''}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
              />
              <PasswordToggle
                type="button"
                onClick={togglePasswordVisibility}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </PasswordToggle>
            </InputContainer>
            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
          </FormGroup>

          <ForgotPasswordLink to="/forgot-password">
            Forgot your password?
          </ForgotPasswordLink>

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </SubmitButton>
        </Form>

        {isError && <ErrorMessage style={{ textAlign: 'center', marginTop: '1rem' }}>
          {message}
        </ErrorMessage>}

        <Divider>
          <span>New to HRMS?</span>
        </Divider>

        <RegisterLink to="/register">
          Don't have an account? <strong>Sign up</strong>
        </RegisterLink>
      </LoginCard>
    </LoginContainer>
  )
}

export default Login
