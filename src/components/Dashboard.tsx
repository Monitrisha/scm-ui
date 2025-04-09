
import React, { useEffect, useState } from 'react';
import { fetchDashboardStats, fetchEvents } from '@/services/api';
import { Event } from '@/components/EventsTable';
import StatusCard from '@/components/StatusCard';
import EventsTable from '@/components/EventsTable';
import { Card } from '@/components/ui/card';

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [stats, setStats] = useState({
    triggerEvents: 0,
    eventsResolved: 0,
    awaitingPlannerInput: 0,
    eventsPending: 0
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [eventsData, statsData] = await Promise.all([
          fetchEvents(),
          fetchDashboardStats()
        ]);
        setEvents(eventsData);
        setStats(statsData);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg">Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4 text-center">Dashboard</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatusCard title="Trigger Events" count={stats.triggerEvents} />
        <StatusCard title="Events Resolved" count={stats.eventsResolved} />
        <StatusCard title="Awaiting Planner Input" count={stats.awaitingPlannerInput} />
        <StatusCard title="Events Pending" count={stats.eventsPending} />
      </div>
      
      <Card className="p-4 border-2 border-orange-200">
        <EventsTable events={events} />
      </Card>
    </div>
  );
};

export default Dashboard;
