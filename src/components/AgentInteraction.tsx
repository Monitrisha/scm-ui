
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

const AgentInteraction: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6">
      <Button className="rounded-full p-4 h-16 w-16 flex items-center justify-center bg-green-100 border-2 border-green-500 hover:bg-green-200">
        <div className="flex flex-col items-center">
          <MessageSquare className="h-6 w-6 text-green-700" />
        </div>
      </Button>
      <p className="text-xs text-center mt-1 text-green-700 font-medium">Interact with Agent</p>
    </div>
  );
};

export default AgentInteraction;
