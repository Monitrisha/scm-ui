
import { Event } from '@/components/EventsTable';

// Mock data for frontend development
// In a real application, these would be fetched from the Flask backend
const mockEvents: Event[] = [
  {
    id: 1,
    description: "Supplier ABC email on PO delay.",
    impactCategory: "High",
    status: "Resolved"
  },
  {
    id: 2,
    description: "For Cost Vs Time analysis agent need planner approval.",
    impactCategory: "High",
    status: "Awaiting Planner Input"
  },
  {
    id: 3,
    description: "Winter storm predicted in Dallas.",
    impactCategory: "Medium",
    status: "Resolved"
  },
  {
    id: 4,
    description: "Shipment delayed due to port congestion.",
    impactCategory: "Medium",
    status: "Events Pending"
  },
  {
    id: 5,
    description: "New supplier onboarding request.",
    impactCategory: "Low",
    status: "Resolved"
  }
];

// This would be replaced with actual API calls in production
export const fetchEvents = async (): Promise<Event[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockEvents;
};

export const fetchDashboardStats = async (): Promise<{
  triggerEvents: number;
  eventsResolved: number;
  awaitingPlannerInput: number;
  eventsPending: number;
}> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Calculate stats based on mock data
  const triggerEvents = mockEvents.length;
  const eventsResolved = mockEvents.filter(e => e.status === 'Resolved').length;
  const awaitingPlannerInput = mockEvents.filter(e => e.status === 'Awaiting Planner Input').length;
  const eventsPending = mockEvents.filter(e => e.status === 'Events Pending').length;
  
  return {
    triggerEvents,
    eventsResolved,
    awaitingPlannerInput,
    eventsPending
  };
};
