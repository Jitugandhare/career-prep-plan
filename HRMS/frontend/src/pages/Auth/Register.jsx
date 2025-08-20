import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register as registerUser, reset } from '../../store/slices/authSlice'
import companyService from '../../services/companyService'

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
  max-width: 720px;
`

const Title = styled.h1`
  margin: 0 0 var(--spacing-1) 0;
  color: var(--gray-900);
`

const Subtitle = styled.p`
  margin: 0 0 var(--spacing-6) 0;
  color: var(--gray-600);
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--spacing-4);
`

const Field = styled.div`
  grid-column: span 12;
  @media (min-width: 768px) {
    &.md-6 { grid-column: span 6; }
    &.md-4 { grid-column: span 4; }
  }
`

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: var(--gray-700);
  margin-bottom: var(--spacing-2);
  font-size: var(--font-size-sm);
`

const Input = styled.input`
  width: 100%;
  padding: var(--spacing-3) var(--spacing-4);
  border: 2px solid var(--gray-200);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  transition: all var(--transition-fast);
  &:focus { outline: none; border-color: var(--primary-500); box-shadow: 0 0 0 3px rgb(59 130 246 / 0.1); }
  &.error { border-color: var(--error-500); }
`

const Select = styled.select`
  width: 100%;
  padding: var(--spacing-3) var(--spacing-4);
  border: 2px solid var(--gray-200);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  background: white;
  &:focus { outline: none; border-color: var(--primary-500); box-shadow: 0 0 0 3px rgb(59 130 246 / 0.1); }
  &.error { border-color: var(--error-500); }
`

const ErrorText = styled.span`
  color: var(--error-600);
  font-size: var(--font-size-sm);
  margin-top: var(--spacing-1);
  display: block;
`

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-3);
  margin-top: var(--spacing-6);
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

const SecondaryButton = styled.button`
  background: white;
  color: var(--gray-700);
  border: 1px solid var(--gray-300);
  padding: var(--spacing-3) var(--spacing-6);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  &:hover { background: var(--gray-50); }
`

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, isSuccess, isError, message } = useSelector((state) => state.auth)

  const { register, handleSubmit, formState: { errors } } = useForm()
  const [departments, setDepartments] = useState([])
  const [sections, setSections] = useState([])
  const [loadingMeta, setLoadingMeta] = useState(false)

  useEffect(() => {
    const loadMeta = async () => {
      try {
        setLoadingMeta(true)
        const [deptRes, secRes] = await Promise.all([
          companyService.getDepartments(),
          companyService.getSections(),
        ])
        setDepartments(deptRes.data?.data || deptRes.data || [])
        setSections(secRes.data?.data || secRes.data || [])
      } catch (e) {
        // ignore
      } finally {
        setLoadingMeta(false)
      }
    }
    loadMeta()
  }, [])

  useEffect(() => {
    if (isSuccess) {
      navigate('/dashboard')
    }
    return () => { dispatch(reset()) }
  }, [isSuccess, navigate, dispatch])

  const onSubmit = (data) => {
    dispatch(registerUser({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      department: data.department,
      section: data.section || undefined,
      designation: data.designation,
      dateOfJoining: data.dateOfJoining,
      contactNumber: data.contactNumber || undefined,
    }))
  }

  return (
    <Container>
      <Card>
        <Title>Create New User</Title>
        <Subtitle>Only Super Admins can register new users</Subtitle>

        {isError && message && <ErrorText style={{ textAlign: 'center', marginBottom: '1rem' }}>{message}</ErrorText>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid>
            <Field className="md-6">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" placeholder="John Doe" {...register('fullName', { required: 'Full name is required' })} className={errors.fullName ? 'error' : ''} />
              {errors.fullName && <ErrorText>{errors.fullName.message}</ErrorText>}
            </Field>

            <Field className="md-6">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" {...register('email', { required: 'Email is required' })} className={errors.email ? 'error' : ''} />
              {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
            </Field>

            <Field className="md-6">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } })} className={errors.password ? 'error' : ''} />
              {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
            </Field>

            <Field className="md-6">
              <Label htmlFor="designation">Designation</Label>
              <Input id="designation" placeholder="Software Engineer" {...register('designation', { required: 'Designation is required' })} className={errors.designation ? 'error' : ''} />
              {errors.designation && <ErrorText>{errors.designation.message}</ErrorText>}
            </Field>

            <Field className="md-6">
              <Label htmlFor="dateOfJoining">Date of Joining</Label>
              <Input id="dateOfJoining" type="date" {...register('dateOfJoining', { required: 'Joining date is required' })} className={errors.dateOfJoining ? 'error' : ''} />
              {errors.dateOfJoining && <ErrorText>{errors.dateOfJoining.message}</ErrorText>}
            </Field>

            <Field className="md-6">
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input id="contactNumber" type="tel" placeholder="+1 555 123 4567" {...register('contactNumber')} />
            </Field>

            <Field className="md-6">
              <Label htmlFor="department">Department</Label>
              <Select id="department" disabled={loadingMeta} {...register('department', { required: 'Department is required' })} className={errors.department ? 'error' : ''}>
                <option value="">{loadingMeta ? 'Loading...' : 'Select department'}</option>
                {departments.map((d) => (
                  <option key={d._id || d.id} value={d._id || d.id}>{d.name}</option>
                ))}
              </Select>
              {errors.department && <ErrorText>{errors.department.message}</ErrorText>}
            </Field>

            <Field className="md-6">
              <Label htmlFor="section">Section (optional)</Label>
              <Select id="section" disabled={loadingMeta} {...register('section')}>
                <option value="">{loadingMeta ? 'Loading...' : 'Select section'}</option>
                {sections.map((s) => (
                  <option key={s._id || s.id} value={s._id || s.id}>{s.name}</option>
                ))}
              </Select>
            </Field>
          </Grid>

          <Actions>
            <SecondaryButton type="button" onClick={() => navigate(-1)}>Cancel</SecondaryButton>
            <Button type="submit" disabled={isLoading}>{isLoading ? 'Creating...' : 'Create User'}</Button>
          </Actions>
        </form>
      </Card>
    </Container>
  )
}

export default Register


