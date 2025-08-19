import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { 
  FiUsers, 
  FiClock, 
  FiCalendar, 
  FiDollarSign,
  FiTrendingUp,
  FiTrendingDown,
  FiAlertCircle
} from 'react-icons/fi'

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const PageHeader = styled.div`
  margin-bottom: var(--spacing-8);
  
  h1 {
    color: var(--gray-900);
    margin-bottom: var(--spacing-2);
  }
  
  p {
    color: var(--gray-600);
    font-size: var(--font-size-lg);
  }
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-6);
  margin-bottom: var(--spacing-8);
`

const StatCard = styled.div`
  background: white;
  border-radius: var(--radius-xl);
  padding: var(--spacing-6);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--gray-200);
  transition: all var(--transition-fast);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
`

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-4);
`

const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: var(--font-size-xl);
  
  &.primary {
    background: var(--primary-500);
  }
  
  &.success {
    background: var(--success-500);
  }
  
  &.warning {
    background: var(--warning-500);
  }
  
  &.error {
    background: var(--error-500);
  }
`

const StatTrend = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
  font-size: var(--font-size-sm);
  font-weight: 500;
  
  &.up {
    color: var(--success-600);
  }
  
  &.down {
    color: var(--error-600);
  }
`

const StatValue = styled.div`
  font-size: var(--font-size-3xl);
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: var(--spacing-2);
`

const StatLabel = styled.div`
  color: var(--gray-600);
  font-size: var(--font-size-sm);
  font-weight: 500;
`

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--spacing-6);
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
`

const SideContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
`

const ContentCard = styled.div`
  background: white;
  border-radius: var(--radius-xl);
  padding: var(--spacing-6);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--gray-200);
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-4);
  
  h3 {
    color: var(--gray-900);
    margin: 0;
  }
`

const ViewAllButton = styled.button`
  background: none;
  border: none;
  color: var(--primary-600);
  font-size: var(--font-size-sm);
  font-weight: 500;
  cursor: pointer;
  padding: var(--spacing-2) var(--spacing-3);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  
  &:hover {
    background: var(--primary-50);
  }
`

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
`

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  padding: var(--spacing-3);
  border-radius: var(--radius-md);
  transition: background-color var(--transition-fast);
  
  &:hover {
    background: var(--gray-50);
  }
`

const ActivityIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: var(--font-size-sm);
  
  &.clock {
    background: var(--primary-500);
  }
  
  &.calendar {
    background: var(--success-500);
  }
  
  &.alert {
    background: var(--warning-500);
  }
`

const ActivityContent = styled.div`
  flex: 1;
  
  .activity-title {
    font-weight: 500;
    color: var(--gray-900);
    margin: 0 0 var(--spacing-1) 0;
    font-size: var(--font-size-sm);
  }
  
  .activity-time {
    color: var(--gray-500);
    font-size: var(--font-size-xs);
    margin: 0;
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: var(--spacing-8);
  color: var(--gray-500);
  
  .empty-icon {
    font-size: var(--font-size-4xl);
    margin-bottom: var(--spacing-4);
    opacity: 0.5;
  }
  
  .empty-text {
    font-size: var(--font-size-lg);
    margin-bottom: var(--spacing-2);
  }
  
  .empty-subtext {
    font-size: var(--font-size-sm);
  }
`

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth)
  const { company } = useSelector((state) => state.company)

  // Mock data - replace with actual API calls
  const stats = [
    {
      title: 'Total Employees',
      value: '156',
      change: '+12%',
      trend: 'up',
      icon: FiUsers,
      color: 'primary'
    },
    {
      title: 'Present Today',
      value: '142',
      change: '+5%',
      trend: 'up',
      icon: FiClock,
      color: 'success'
    },
    {
      title: 'On Leave',
      value: '8',
      change: '-2%',
      trend: 'down',
      icon: FiCalendar,
      color: 'warning'
    },
    {
      title: 'Total Payroll',
      value: '$45.2K',
      change: '+8%',
      trend: 'up',
      icon: FiDollarSign,
      color: 'success'
    }
  ]

  const recentActivities = [
    {
      id: 1,
      title: 'John Doe clocked in',
      time: '2 minutes ago',
      icon: FiClock,
      color: 'clock'
    },
    {
      id: 2,
      title: 'Leave request approved for Jane Smith',
      time: '15 minutes ago',
      icon: FiCalendar,
      color: 'calendar'
    },
    {
      id: 3,
      title: 'New employee onboarding completed',
      time: '1 hour ago',
      icon: FiUsers,
      color: 'clock'
    },
    {
      id: 4,
      title: 'Payroll processed for March',
      time: '2 hours ago',
      icon: FiDollarSign,
      color: 'success'
    }
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: 'Team Meeting',
      time: 'Today, 2:00 PM',
      type: 'meeting'
    },
    {
      id: 2,
      title: 'Performance Review Deadline',
      time: 'Tomorrow, 5:00 PM',
      type: 'deadline'
    },
    {
      id: 3,
      title: 'Company Holiday',
      time: 'Friday, All Day',
      type: 'holiday'
    }
  ]

  return (
    <DashboardContainer>
      <PageHeader>
        <h1>Welcome back, {user?.fullName || 'User'}!</h1>
        <p>Here's what's happening in your organization today.</p>
      </PageHeader>

      <StatsGrid>
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <StatCard key={index}>
              <StatHeader>
                <StatIcon className={stat.color}>
                  <Icon />
                </StatIcon>
                <StatTrend className={stat.trend}>
                  {stat.trend === 'up' ? <FiTrendingUp /> : <FiTrendingDown />}
                  {stat.change}
                </StatTrend>
              </StatHeader>
              <StatValue>{stat.value}</StatValue>
              <StatLabel>{stat.title}</StatLabel>
            </StatCard>
          )
        })}
      </StatsGrid>

      <ContentGrid>
        <MainContent>
          <ContentCard>
            <CardHeader>
              <h3>Recent Activities</h3>
              <ViewAllButton>View All</ViewAllButton>
            </CardHeader>
            <ActivityList>
              {recentActivities.map((activity) => {
                const Icon = activity.icon
                return (
                  <ActivityItem key={activity.id}>
                    <ActivityIcon className={activity.color}>
                      <Icon />
                    </ActivityIcon>
                    <ActivityContent>
                      <p className="activity-title">{activity.title}</p>
                      <p className="activity-time">{activity.time}</p>
                    </ActivityContent>
                  </ActivityItem>
                )
              })}
            </ActivityList>
          </ContentCard>

          <ContentCard>
            <CardHeader>
              <h3>Quick Actions</h3>
            </CardHeader>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <button style={{
                padding: '1rem',
                border: '1px solid var(--gray-200)',
                borderRadius: 'var(--radius-lg)',
                background: 'white',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <FiClock style={{ fontSize: '1.5rem', color: 'var(--primary-500)' }} />
                <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Clock In/Out</span>
              </button>
              <button style={{
                padding: '1rem',
                border: '1px solid var(--gray-200)',
                borderRadius: 'var(--radius-lg)',
                background: 'white',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <FiCalendar style={{ fontSize: '1.5rem', color: 'var(--success-500)' }} />
                <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Request Leave</span>
              </button>
            </div>
          </ContentCard>
        </MainContent>

        <SideContent>
          <ContentCard>
            <CardHeader>
              <h3>Upcoming Events</h3>
              <ViewAllButton>View All</ViewAllButton>
            </CardHeader>
            <ActivityList>
              {upcomingEvents.map((event) => (
                <ActivityItem key={event.id}>
                  <ActivityIcon className="calendar">
                    <FiCalendar />
                  </ActivityIcon>
                  <ActivityContent>
                    <p className="activity-title">{event.title}</p>
                    <p className="activity-time">{event.time}</p>
                  </ActivityContent>
                </ActivityItem>
              ))}
            </ActivityList>
          </ContentCard>

          <ContentCard>
            <CardHeader>
              <h3>Quick Stats</h3>
            </CardHeader>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--gray-600)' }}>This Week</span>
                <span style={{ fontWeight: '600' }}>32 hrs</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--gray-600)' }}>Leave Balance</span>
                <span style={{ fontWeight: '600' }}>15 days</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--gray-600)' }}>Overtime</span>
                <span style={{ fontWeight: '600' }}>2.5 hrs</span>
              </div>
            </div>
          </ContentCard>
        </SideContent>
      </ContentGrid>
    </DashboardContainer>
  )
}

export default Dashboard
