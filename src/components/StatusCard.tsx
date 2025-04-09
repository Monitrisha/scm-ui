
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface StatusCardProps {
  title: string;
  count: number;
}

const StatusCard: React.FC<StatusCardProps> = ({ title, count }) => {
  return (
    <Card className="h-full">
      <CardContent className="flex flex-col items-center justify-center p-6 h-full">
        <h3 className="text-lg font-medium text-center mb-2">{title}</h3>
        <p className="text-3xl font-bold">{count}</p>
      </CardContent>
    </Card>
  );
};

export default StatusCard;
