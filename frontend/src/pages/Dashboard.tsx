import React, { ReactNode } from 'react';
import MainLayout from '@/Layouts/MainLayout';

interface DashboardProps {
  children: ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => (
  <MainLayout>
    <h1>This is the Dashboard</h1>
    {children}
  </MainLayout>
);

export default Dashboard;
