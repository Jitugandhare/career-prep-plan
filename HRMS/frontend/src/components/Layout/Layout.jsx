import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toggleSidebar, setSidebarOpen } from '../../store/slices/uiSlice'
import styled from 'styled-components'

// Components
import Sidebar from './Sidebar'
import Header from './Header'

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: var(--gray-50);
`

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: ${props => props.$sidebarOpen ? '280px' : '0'};
  transition: margin-left var(--transition-normal);
  
  @media (max-width: 768px) {
    margin-left: 0;
  }
`

const ContentArea = styled.div`
  flex: 1;
  padding: var(--spacing-6);
  overflow-y: auto;
  
  @media (max-width: 768px) {
    padding: var(--spacing-4);
  }
`

const Layout = () => {
  const dispatch = useDispatch()
  const { sidebarOpen } = useSelector((state) => state.ui)
  const [isMobile, setIsMobile] = useState(false)

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)
      
      // Auto-close sidebar on mobile
      if (mobile && sidebarOpen) {
        dispatch(setSidebarOpen(false))
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    
    return () => window.removeEventListener('resize', handleResize)
  }, [dispatch, sidebarOpen])

  // Close sidebar when clicking outside on mobile
  const handleContentClick = () => {
    if (isMobile && sidebarOpen) {
      dispatch(setSidebarOpen(false))
    }
  }

  return (
    <LayoutContainer>
      <Sidebar />
      <MainContent $sidebarOpen={sidebarOpen}>
        <Header />
        <ContentArea onClick={handleContentClick}>
          <Outlet />
        </ContentArea>
      </MainContent>
    </LayoutContainer>
  )
}

export default Layout






