
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import EventDetail from '@/components/EventDetail';

export interface Event {
  id: number;
  description: string;
  impactCategory: 'High' | 'Medium' | 'Low';
  status: 'Resolved' | 'Awaiting Planner Input' | 'Events Pending';
}

interface EventsTableProps {
  events: Event[];
}

const EventsTable: React.FC<EventsTableProps> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High':
        return 'bg-impact-high text-white';
      case 'Medium':
        return 'bg-impact-medium text-white';
      case 'Low':
        return 'bg-impact-low text-white';
      default:
        return 'bg-gray-400 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Awaiting Planner Input':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Events Pending':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleCloseDetail = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="w-full">
      {selectedEvent ? (
        <EventDetail event={selectedEvent} onClose={handleCloseDetail} />
      ) : (
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px] text-center">#</TableHead>
                <TableHead>Trigger Event</TableHead>
                <TableHead className="w-[150px]">Impact Category</TableHead>
                <TableHead className="w-[200px]">Event Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow 
                  key={event.id} 
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleEventClick(event)}
                >
                  <TableCell className="text-center">{event.id}</TableCell>
                  <TableCell>{event.description}</TableCell>
                  <TableCell>
                    <Badge className={`${getImpactColor(event.impactCategory)}`}>
                      {event.impactCategory}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${getStatusColor(event.status)}`}>
                      {event.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className="text-sm text-gray-500 mt-2">*List of all events. Click on an event for details</p>
        </div>
      )}
    </div>
  );
};

export default EventsTable;
