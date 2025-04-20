import React from 'react';
import { MessageSquare } from 'lucide-react';



const ChatEmptyState: React.FC = () => {
  return (
    <div className="text-center p-8 w-full h-full space-y-6 flex flex-col items-center justify-center ">
      <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto">
        <MessageSquare className="w-10 h-10 text-blue-600" />
      </div>
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-foreground">
          No messages yet
        </h2>
        <p className="text-muted-foreground">
          Be the first to start a conversation. Send a message to begin chatting with your friend.
        </p>
      </div>
    </div>
  );
};

export default ChatEmptyState;