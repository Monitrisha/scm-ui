
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Event } from '@/components/EventsTable';
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, AlertTriangle, MessageSquare, Check } from "lucide-react";

interface EventDetailProps {
  event: Event;
  onClose: () => void;
}

const EventDetail: React.FC<EventDetailProps> = ({ event, onClose }) => {
  // In a real application, we would fetch detailed event data here
  // For now, we'll simulate with some mock detailed data
  
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Resolved':
        return <Check className="h-4 w-4" />;
      case 'Awaiting Planner Input':
        return <AlertTriangle className="h-4 w-4" />;
      case 'Events Pending':
        return <Clock className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };
  
  return (
    <Card className="border-2 border-orange-200 shadow-lg">
      <CardHeader className="bg-orange-50/50">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">
            Event #{event.id} Details
          </CardTitle>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-gray-700">{event.description}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Impact Category</h3>
              <Badge className={`${getImpactColor(event.impactCategory)}`}>
                {event.impactCategory}
              </Badge>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Status</h3>
              <Badge variant="outline" className={`${getStatusColor(event.status)} flex items-center gap-1`}>
                {getStatusIcon(event.status)}
                {event.status}
              </Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Created Date</h3>
              <div className="flex items-center gap-2 text-gray-700">
                <Calendar className="h-4 w-4" />
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Last Updated</h3>
              <div className="flex items-center gap-2 text-gray-700">
                <Clock className="h-4 w-4" />
                <span>{new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Recommended Actions</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {event.status === 'Awaiting Planner Input' && (
                <>
                  <li>Review impact assessment</li>
                  <li>Provide approval for agent to proceed</li>
                </>
              )}
              {event.status === 'Events Pending' && (
                <>
                  <li>Monitor status changes</li>
                  <li>Verify data accuracy</li>
                </>
              )}
              {event.status === 'Resolved' && (
                <>
                  <li>Review resolution steps</li>
                  <li>Document lessons learned</li>
                </>
              )}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Real-time Updates</h3>
            <div className="bg-gray-50 p-3 rounded border text-sm">
              <p className="text-gray-600">
                {event.status === 'Resolved' 
                  ? 'All actions related to this event have been completed.' 
                  : 'Agent is actively monitoring this event for changes.'}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventDetail;
