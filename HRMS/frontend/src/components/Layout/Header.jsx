import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSidebar, openModal } from '../../store/slices/uiSlice'
import { logout } from '../../store/slices/authSlice'
import styled from 'styled-components'
import { 
  FiMenu, 
  FiBell, 
  FiSearch, 
  FiUser, 
  FiLogOut,
  FiSettings,
  FiMoon,
  FiSun
} from 'react-icons/fi'

const HeaderContainer = styled.header`
  background: white;
  border-bottom: 1px solid var(--gray-200);
  padding: var(--spacing-4) var(--spacing-6);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  box-shadow: var(--shadow-sm);
`

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
`

const MenuButton = styled.button`
  background: none;
  border: none;
  color: var(--gray-600);
  font-size: var(--font-size-xl);
  cursor: pointer;
  padding: var(--spacing-2);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: var(--gray-100);
    color: var(--gray-800);
  }
  
  @media (min-width: 769px) {
    display: none;
  }
`

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`

const SearchInput = styled.input`
  width: 300px;
  padding: var(--spacing-3) var(--spacing-4) var(--spacing-3) var(--spacing-10);
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-lg);
  background-color: var(--gray-50);
  transition: all var(--transition-fast);
  
  &:focus {
    width: 400px;
    background-color: white;
    border-color: var(--primary-500);
    box-shadow: 0 0 0 3px rgb(59 130 246 / 0.1);
  }
  
  &::placeholder {
    color: var(--gray-500);
  }
`

const SearchIcon = styled(FiSearch)`
  position: absolute;
  left: var(--spacing-3);
  color: var(--gray-500);
  width: 20px;
  height: 20px;
`

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
`

const ActionButton = styled.button`
  background: none;
  border: none;
  color: var(--gray-600);
  font-size: var(--font-size-lg);
  cursor: pointer;
  padding: var(--spacing-2);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: var(--gray-100);
    color: var(--gray-800);
  }
  
  &.active {
    background-color: var(--primary-50);
    color: var(--primary-600);
  }
`

const NotificationBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background: var(--error-500);
  color: white;
  font-size: var(--font-size-xs);
  font-weight: 600;
  padding: 2px 6px;
  border-radius: var(--radius-full);
  min-width: 18px;
  text-align: center;
  line-height: 1;
`

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
`

const UserButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-3);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  
  &:hover {
    background-color: var(--gray-100);
  }
`

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  background: var(--primary-500);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: var(--font-size-sm);
`

const UserInfo = styled.div`
  text-align: left;
  
  .user-name {
    font-weight: 600;
    color: var(--gray-900);
    margin: 0;
    font-size: var(--font-size-sm);
  }
  
  .user-role {
    color: var(--gray-500);
    margin: 0;
    font-size: var(--font-size-xs);
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`

const Header = () => {
  const dispatch = useDispatch()
  const { sidebarOpen, theme } = useSelector((state) => state.ui)
  const { user } = useSelector((state) => state.auth)

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar())
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleOpenProfile = () => {
    dispatch(openModal('profile'))
  }

  const handleToggleTheme = () => {
    // Theme toggle functionality will be implemented
    console.log('Toggle theme')
  }

  return (
    <HeaderContainer>
      <LeftSection>
        <MenuButton onClick={handleToggleSidebar}>
          <FiMenu />
        </MenuButton>
        
        <SearchContainer>
          <SearchIcon />
          <SearchInput 
            type="text" 
            placeholder="Search employees, reports, or settings..."
          />
        </SearchContainer>
      </LeftSection>

      <RightSection>
        <ActionButton onClick={handleToggleTheme} className={theme === 'dark' ? 'active' : ''}>
          {theme === 'dark' ? <FiSun /> : <FiMoon />}
        </ActionButton>
        
        <ActionButton>
          <FiBell />
          <NotificationBadge>3</NotificationBadge>
        </ActionButton>
        
        <ActionButton onClick={handleOpenProfile}>
          <FiSettings />
        </ActionButton>
        
        <UserMenu>
          <UserButton onClick={handleOpenProfile}>
            <UserAvatar>
              {user?.fullName?.charAt(0) || 'U'}
            </UserAvatar>
            <UserInfo>
              <p className="user-name">{user?.fullName || 'User'}</p>
              <p className="user-role">{user?.role?.replace('_', ' ').toUpperCase() || 'EMPLOYEE'}</p>
            </UserInfo>
          </UserButton>
          
          <ActionButton onClick={handleLogout} title="Logout">
            <FiLogOut />
          </ActionButton>
        </UserMenu>
      </RightSection>
    </HeaderContainer>
  )
}

export default Header
