
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Event } from '@/components/EventsTable';
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, Check, ArrowLeft, ExternalLink } from "lucide-react";

interface EventDetailProps {
  event: Event;
  onClose: () => void;
}

const EventDetail: React.FC<EventDetailProps> = ({ event, onClose }) => {
  // In a real application, we would fetch detailed event data here
  // For now, we'll simulate with some mock detailed data based on the event ID
  
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

  // Mock detailed data based on event ID
  const poDetails = {
    poNumber: "123",
    originalDueDate: "2025-02-05",
    newDueDate: "2025-02-20",
    quantity: "1000 units"
  };

  const impactDetails = [
    {
      agent: "Supply Planning Agent (Inventory)",
      status: "PO for material no 1002, Current inventory of 180 qty, delayed by 15 days.",
      impact: "High"
    },
    {
      agent: "Supply Planning Agent (Production)",
      status: "Production planned for 500 units, shortfall of 320 units.",
      impact: "High"
    },
    {
      agent: "Supply Planning Agent (Customer order)",
      status: "Customer demand is unmet & Customer priority is High",
      impact: "High"
    }
  ];

  const actionDetails = [
    {
      agent: "Procurement Agent",
      status: "Delay of 15 days.",
      action: "Expedite the partial delivery of at least 320 units on or before the original due date."
    }
  ];

  const triggerDetails = {
    description: `Supplier email regarding PO #123. 
Supplier says delay by 15 days or quantity cannot be fulfilled`
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={onClose}
          className="flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Events
        </Button>
      </div>

      {/* Trigger Event Section */}
      <Card className="border-2 border-green-200">
        <CardHeader className="bg-green-50/50 pb-3">
          <CardTitle className="text-lg font-medium">Trigger Event:</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-800 mb-4">{triggerDetails.description}</p>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px] text-center">#</TableHead>
                <TableHead>PO No.</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Impact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-center">1</TableCell>
                <TableCell>{poDetails.poNumber}</TableCell>
                <TableCell>Original due date was {poDetails.originalDueDate}, but we have received a new due date of {poDetails.newDueDate}.</TableCell>
                <TableCell>Order qty {poDetails.quantity}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Impact Category Section */}
      <Card className="border-2 border-green-200">
        <CardHeader className="bg-green-50/50 pb-3 flex flex-row justify-between items-center">
          <CardTitle className="text-lg font-medium">
            Impact Category: Based on analysis – it is {event.impactCategory} category impact
          </CardTitle>
          <Button variant="default" className="bg-blue-700 hover:bg-blue-800" size="sm">
            <ExternalLink className="h-4 w-4 mr-1" />
            View All Details
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Impact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {impactDetails.map((detail, index) => (
                <TableRow key={index}>
                  <TableCell>{detail.agent}</TableCell>
                  <TableCell>{detail.status}</TableCell>
                  <TableCell>
                    <Badge className={getImpactColor(detail.impact)}>
                      {detail.impact}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Action Taken Section */}
      <Card className="border-2 border-green-200">
        <CardHeader className="bg-green-50/50 pb-3 flex flex-row justify-between items-center">
          <CardTitle className="text-lg font-medium">
            Action Taken: Email sent to supplier
          </CardTitle>
          <Button variant="default" className="bg-blue-700 hover:bg-blue-800" size="sm">
            Provide Additional Inputs
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {actionDetails.map((detail, index) => (
                <TableRow key={index}>
                  <TableCell>{detail.agent}</TableCell>
                  <TableCell>{detail.status}</TableCell>
                  <TableCell>{detail.action}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventDetail;
