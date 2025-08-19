import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toggleSidebar } from '../../store/slices/uiSlice'
import styled from 'styled-components'
import { 
  FiHome, 
  FiUsers, 
  FiClock, 
  FiCalendar, 
  FiDollarSign, 
  FiBuilding, 
  FiSettings, 
  FiUser,
  FiMenu,
  FiX
} from 'react-icons/fi'

const SidebarContainer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 280px;
  background: linear-gradient(135deg, var(--primary-800) 0%, var(--primary-900) 100%);
  color: white;
  z-index: var(--z-fixed);
  transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  transition: transform var(--transition-normal);
  box-shadow: var(--shadow-xl);
  
  @media (max-width: 768px) {
    width: 100%;
    transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  }
`

const SidebarHeader = styled.div`
  padding: var(--spacing-6);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  
  h1 {
    font-size: var(--font-size-xl);
    font-weight: 700;
    color: white;
    margin: 0;
  }
  
  .logo-icon {
    width: 32px;
    height: 32px;
    background: var(--primary-400);
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
`

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: var(--font-size-xl);
  cursor: pointer;
  padding: var(--spacing-2);
  border-radius: var(--radius-md);
  transition: background-color var(--transition-fast);
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  @media (min-width: 769px) {
    display: none;
  }
`

const Nav = styled.nav`
  padding: var(--spacing-6) 0;
  flex: 1;
  overflow-y: auto;
`

const NavSection = styled.div`
  margin-bottom: var(--spacing-8);
  
  &:last-child {
    margin-bottom: 0;
  }
`

const SectionTitle = styled.h3`
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 var(--spacing-4) var(--spacing-6);
`

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const NavItem = styled.li`
  margin: 0;
`

const NavLinkStyled = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  padding: var(--spacing-3) var(--spacing-6);
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all var(--transition-fast);
  border-left: 3px solid transparent;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
  }
  
  &.active {
    background-color: rgba(255, 255, 255, 0.15);
    color: white;
    border-left-color: var(--primary-400);
  }
  
  .nav-icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
  
  .nav-text {
    font-weight: 500;
  }
`

const UserSection = styled.div`
  padding: var(--spacing-6);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: auto;
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  margin-bottom: var(--spacing-4);
`

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  background: var(--primary-400);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
`

const UserDetails = styled.div`
  flex: 1;
  
  .user-name {
    font-weight: 600;
    color: white;
    margin: 0 0 var(--spacing-1) 0;
    font-size: var(--font-size-sm);
  }
  
  .user-role {
    color: rgba(255, 255, 255, 0.7);
    font-size: var(--font-size-xs);
    margin: 0;
  }
`

const Sidebar = () => {
  const dispatch = useDispatch()
  const { sidebarOpen } = useSelector((state) => state.ui)
  const { user } = useSelector((state) => state.auth)
  const location = useLocation()

  const navigationItems = [
    {
      title: 'Main',
      items: [
        { path: '/dashboard', icon: FiHome, text: 'Dashboard' },
        { path: '/profile', icon: FiUser, text: 'Profile' },
      ]
    },
    {
      title: 'Management',
      items: [
        { path: '/employees', icon: FiUsers, text: 'Employees', roles: ['admin', 'super_admin', 'manager'] },
        { path: '/attendance', icon: FiClock, text: 'Attendance' },
        { path: '/leave', icon: FiCalendar, text: 'Leave Management' },
        { path: '/payroll', icon: FiDollarSign, text: 'Payroll' },
      ]
    },
    {
      title: 'Organization',
      items: [
        { path: '/company', icon: FiBuilding, text: 'Company', roles: ['admin', 'super_admin'] },
        { path: '/settings', icon: FiSettings, text: 'Settings' },
      ]
    }
  ]

  const canAccessItem = (item) => {
    if (!item.roles) return true
    return user && item.roles.includes(user.role)
  }

  const handleCloseSidebar = () => {
    dispatch(toggleSidebar())
  }

  return (
    <SidebarContainer isOpen={sidebarOpen}>
      <SidebarHeader>
        <Logo>
          <div className="logo-icon">
            <FiBuilding />
          </div>
          <h1>HRMS</h1>
        </Logo>
        <CloseButton onClick={handleCloseSidebar}>
          <FiX />
        </CloseButton>
      </SidebarHeader>

      <Nav>
        {navigationItems.map((section) => (
          <NavSection key={section.title}>
            <SectionTitle>{section.title}</SectionTitle>
            <NavList>
              {section.items
                .filter(canAccessItem)
                .map((item) => {
                  const Icon = item.icon
                  return (
                    <NavItem key={item.path}>
                      <NavLinkStyled 
                        to={item.path}
                        className={location.pathname === item.path ? 'active' : ''}
                      >
                        <Icon className="nav-icon" />
                        <span className="nav-text">{item.text}</span>
                      </NavLinkStyled>
                    </NavItem>
                  )
                })}
            </NavList>
          </NavSection>
        ))}
      </Nav>

      <UserSection>
        <UserInfo>
          <UserAvatar>
            {user?.fullName?.charAt(0) || 'U'}
          </UserAvatar>
          <UserDetails>
            <h4 className="user-name">{user?.fullName || 'User'}</h4>
            <p className="user-role">{user?.role?.replace('_', ' ').toUpperCase() || 'EMPLOYEE'}</p>
          </UserDetails>
        </UserInfo>
      </UserSection>
    </SidebarContainer>
  )
}

export default Sidebar
