import React, { useState } from 'react'
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
  FiBriefcase, 
  FiSettings, 
  FiUser,
  FiChevronDown,
  FiChevronRight,
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
  transform: translateX(${props => props.$isOpen ? '0' : '-100%'});
  transition: transform var(--transition-normal);
  box-shadow: var(--shadow-xl);
  
  @media (max-width: 768px) {
    width: 100%;
    transform: translateX(${props => props.$isOpen ? '0' : '-100%'});
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

const GroupHeader = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-3);
  padding: var(--spacing-3) var(--spacing-6);
  color: rgba(255, 255, 255, 0.9);
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  transition: all var(--transition-fast);
  border-left: 3px solid transparent;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .left {
    display: flex;
    align-items: center;
    gap: var(--spacing-3);
  }
`

const SubMenu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0 0 0 calc(var(--spacing-6) + 12px);
  
  li a {
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: var(--font-size-sm);
    opacity: 0.9;
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

  const [openGroups, setOpenGroups] = useState({})

  const navigationItems = [
    {
      title: 'Main Menu',
      groups: [
        {
          key: 'dashboard',
          icon: FiHome,
          text: 'Dashboard',
          children: [
            { path: '/dashboard', text: 'Super Admin' },
            { path: '/dashboard', text: 'Admin' },
            { path: '/dashboard', text: 'Employee' },
          ],
        },
        {
          key: 'organization',
          icon: FiBriefcase,
          text: 'Organization',
          roles: ['admin', 'super_admin'],
          children: [
            { path: '/company', text: 'Company Details' },
          ],
        },
        {
          key: 'users',
          icon: FiUsers,
          text: 'Users',
          roles: ['admin', 'super_admin', 'manager'],
          children: [
            { path: '/register', text: 'Add User', roles: ['super_admin'] },
            { path: '/employees', text: 'Users' },
          ],
        },
        {
          key: 'attendance',
          icon: FiClock,
          text: 'Attendance',
          children: [
            { path: '/attendance', text: 'My Attendance' },
          ],
        },
        {
          key: 'leave',
          icon: FiCalendar,
          text: 'Leaves',
          children: [
            { path: '/leave', text: 'Leave Management' },
          ],
        },
        {
          key: 'payroll',
          icon: FiDollarSign,
          text: 'Payroll',
          children: [
            { path: '/payroll', text: 'Payroll' },
          ],
        },
        {
          key: 'settings',
          icon: FiSettings,
          text: 'Settings',
          children: [
            { path: '/settings', text: 'System Settings' },
          ],
        },
      ],
    },
  ]

  const canAccessItem = (item) => {
    if (!item.roles) return true
    return user && item.roles.includes(user.role)
  }

  const toggleGroup = (key) => {
    setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleCloseSidebar = () => {
    dispatch(toggleSidebar())
  }

  return (
    <SidebarContainer $isOpen={sidebarOpen}>
      <SidebarHeader>
        <Logo>
          <div className="logo-icon">
            <FiBriefcase />
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
              {section.groups.map((group) => {
                if (!canAccessItem(group)) return null
                const Icon = group.icon
                const isOpen = !!openGroups[group.key]
                return (
                  <NavItem key={group.key}>
                    <GroupHeader onClick={() => toggleGroup(group.key)} aria-expanded={isOpen}>
                      <div className="left">
                        <Icon className="nav-icon" />
                        <span className="nav-text">{group.text}</span>
                      </div>
                      {isOpen ? <FiChevronDown /> : <FiChevronRight />}
                    </GroupHeader>
                    {isOpen && (
                      <SubMenu>
                        {group.children
                          .filter(canAccessItem)
                          .map((child) => (
                            <li key={child.text}>
                              <NavLinkStyled to={child.path} className={location.pathname === child.path ? 'active' : ''} onClick={handleCloseSidebar}>
                                <span className="nav-text">{child.text}</span>
                              </NavLinkStyled>
                            </li>
                          ))}
                      </SubMenu>
                    )}
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

