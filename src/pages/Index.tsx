
import React from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import Dashboard from '@/components/Dashboard';
import AgentInteraction from '@/components/AgentInteraction';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <DashboardHeader />
      <main className="flex-1 py-6">
        <Dashboard />
      </main>
      <AgentInteraction />
    </div>
  );
};

export default Index;
