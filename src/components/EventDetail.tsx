import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Event } from '@/components/EventsTable';
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, Check, ArrowLeft, ExternalLink, ChartBar } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface EventDetailProps {
  event: Event;
  onClose: () => void;
}

const EventDetail: React.FC<EventDetailProps> = ({ event, onClose }) => {
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

  const affectedCustomerOrders = [
    { name: 'Company A', orders: 120 },
    { name: 'Company B', orders: 90 },
    { name: 'Company C', orders: 70 },
    { name: 'Company D', orders: 40 },
    { name: 'Others', orders: 20 }
  ];

  const chartConfig = {
    orders: {
      label: "Customer Orders",
      theme: {
        light: "#2563eb",
        dark: "#3b82f6",
      },
    },
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

      <Card className="border-2 border-green-200">
        <CardHeader className="bg-green-50/50 pb-3 flex flex-row justify-between items-center">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <ChartBar className="h-5 w-5" />
            Affected Customer Orders Due to Material #1002 (Tyre) Delay
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="h-80 w-full">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={affectedCustomerOrders} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end" 
                    tick={{ fontSize: 12 }}
                    height={70}
                  />
                  <YAxis 
                    label={{ value: 'Number of Orders', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
                  />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-md">
                            <div className="grid grid-cols-2 gap-2">
                              <span className="font-medium">{payload[0].name}:</span>
                              <span className="font-medium">{payload[0].value} orders</span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar 
                    dataKey="orders" 
                    fill="var(--color-orders)" 
                    name="orders"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          <div className="text-sm text-center mt-2 text-muted-foreground">
            Total affected orders: 340 | Material: #1002 (Tyre)
          </div>
        </CardContent>
      </Card>

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
